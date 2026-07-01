import { createServerFn } from "@tanstack/react-start";
import { generateText, Output } from "ai";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const InputSchema = z.object({
  jobDescription: z.string().default(""),
});

const QuestionSchema = z.object({
  question: z.string(),
  answer_tip: z.string(),
});

const QuestionsSchema = z.object({
  technical: z.array(QuestionSchema),
  hr: z.array(QuestionSchema),
  behavioral: z.array(QuestionSchema),
});

export type InterviewQuestions = z.infer<typeof QuestionsSchema>;

export const generateInterviewQuestions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error("Missing GEMINI_API_KEY");

    const { data: resumeRow } = await supabase
      .from("resume")
      .select("resume_text")
      .eq("user_id", userId)
      .maybeSingle();
    const resumeText = (resumeRow?.resume_text ?? "").slice(0, 8000);

    let jobDescription = data.jobDescription;
    if (!jobDescription) {
      const { data: latest } = await supabase
        .from("analysis")
        .select("job_description")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      jobDescription = latest?.job_description ?? "";
    }

    const google = createGoogleGenerativeAI({ apiKey: key });
    const model = google("gemini-2.5-flash");

    const prompt = `You are an experienced interviewer preparing a candidate.
Given the RESUME and JOB DESCRIPTION, generate realistic interview questions tailored to the role and candidate background.

Return ONLY valid JSON matching this exact shape:
{
  "technical": [ { "question": "…", "answer_tip": "1-2 sentence guidance" } ]  // exactly 10 items
  "hr": [ { "question": "…", "answer_tip": "…" } ]                              // exactly 5 items
  "behavioral": [ { "question": "…", "answer_tip": "STAR-style guidance" } ]    // exactly 5 items
}

Rules:
- Technical questions should reference concrete skills/tools from the JD and resume.
- HR questions cover motivation, culture fit, compensation, availability.
- Behavioral questions should be scenario-based ("Tell me about a time…").

RESUME:
"""
${resumeText || "(no resume text on file)"}
"""

JOB DESCRIPTION:
"""
${(jobDescription || "General role — infer from resume.").slice(0, 6000)}
"""`;

    let questions: InterviewQuestions;
    try {
      const { output } = await generateText({
        model,
        prompt,
        output: Output.object({ schema: QuestionsSchema }),
      });
      questions = output;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("429")) throw new Error("Rate limit reached. Please try again in a moment.");
      if (msg.includes("402")) throw new Error("AI credits exhausted. Add credits to continue.");
      throw new Error(`Failed to generate questions: ${msg}`);
    }

    const { data: latest } = await supabase
      .from("analysis")
      .select("id")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (latest) {
      await supabase
        .from("analysis")
        .update({ interview_questions: questions })
        .eq("id", latest.id);
    } else {
      await supabase.from("analysis").insert({ user_id: userId, interview_questions: questions });
    }

    return questions;
  });

export const getLatestInterviewQuestions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase
      .from("analysis")
      .select("interview_questions, job_description")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    const q = data?.interview_questions as InterviewQuestions | null | undefined;
    if (!q || !q.technical) return { questions: null, jobDescription: data?.job_description ?? "" };
    return { questions: q, jobDescription: data?.job_description ?? "" };
  });
