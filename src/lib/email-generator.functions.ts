import { createServerFn } from "@tanstack/react-start";
import { generateText, Output } from "ai";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const InputSchema = z.object({
  jobDescription: z.string().default(""),
  summary: z.string().default(""),
  strengths: z.array(z.string()).default([]),
  importantKeywords: z.array(z.string()).default([]),
});

const EmailSchema = z.object({
  subject: z.string(),
  application_email: z.string(),
  follow_up_email: z.string(),
});

export type RecruiterEmails = z.infer<typeof EmailSchema>;

export const generateRecruiterEmail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error("Missing GEMINI_API_KEY");

    // Load the user's resume text for personalization.
    const { data: resumeRow } = await supabase
      .from("resume")
      .select("resume_text")
      .eq("user_id", userId)
      .maybeSingle();
    const resumeText = (resumeRow?.resume_text ?? "").slice(0, 8000);

    const google = createGoogleGenerativeAI({ apiKey: key });
    const model = google("gemini-2.5-flash");

    const prompt = `You are an expert career coach writing outreach emails to recruiters.
Using the candidate's resume, job description, and prior analysis, write:
1. A concise, professional subject line (under 80 chars).
2. A polished application email (150-220 words) — warm, specific, showcases 2-3 strengths and relevant keywords, ends with a clear CTA.
3. A short, polite follow-up email to send 7 days later if no reply (80-120 words).

Return ONLY valid JSON matching:
{
  "subject": "…",
  "application_email": "Full email body with greeting and sign-off",
  "follow_up_email": "Full email body with greeting and sign-off"
}

RESUME:
"""
${resumeText || "(no resume text on file)"}
"""

JOB DESCRIPTION:
"""
${(data.jobDescription || "General application — no specific JD.").slice(0, 6000)}
"""

PRIOR ANALYSIS SUMMARY: ${data.summary || "N/A"}
KEY STRENGTHS: ${data.strengths.join(", ") || "N/A"}
IMPORTANT KEYWORDS: ${data.importantKeywords.join(", ") || "N/A"}`;

    let emails: RecruiterEmails;
    try {
      const { output } = await generateText({
        model,
        prompt,
        output: Output.object({ schema: EmailSchema }),
      });
      emails = output;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("429")) throw new Error("Rate limit reached. Please try again in a moment.");
      if (msg.includes("402")) throw new Error("AI credits exhausted. Add credits to continue.");
      throw new Error(`Failed to generate email: ${msg}`);
    }

    // Persist onto the most recent analysis row for this user.
    const { data: latest } = await supabase
      .from("analysis")
      .select("id")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const serialized = JSON.stringify(emails);
    if (latest) {
      await supabase.from("analysis").update({ generated_email: serialized }).eq("id", latest.id);
    } else {
      await supabase.from("analysis").insert({ user_id: userId, generated_email: serialized });
    }

    return emails;
  });
