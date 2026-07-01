import { createServerFn } from "@tanstack/react-start";
import { generateText, Output } from "ai";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { extractText, getDocumentProxy } from "unpdf";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
const InputSchema = z.object({
  filePath: z.string().min(1),
  jobDescription: z.string().default(""),
});

const AnalysisSchema = z.object({
  match_score: z.number().min(0).max(100),
  ats_score: z.number().min(0).max(100),
  missing_skills: z.array(z.string()),
  important_keywords: z.array(z.string()),
  resume_improvements: z.array(z.string()),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  summary: z.string(),
});

export type ResumeAnalysis = z.infer<typeof AnalysisSchema>;

function safeParseJson(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("AI returned no parseable JSON");
    return JSON.parse(match[0]);
  }
}

export const analyzeResume = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error("Missing GEMINI_API_KEY");

    // 1. Download the uploaded PDF (RLS scoped to the user's folder).
    const { data: blob, error: dlErr } = await supabase.storage
      .from("resumes")
      .download(data.filePath);
    if (dlErr || !blob)
      throw new Error(`Failed to download resume: ${dlErr?.message ?? "unknown"}`);

    // 2. Extract text with unpdf (Workers-compatible pdfjs build).
    const buffer = new Uint8Array(await blob.arrayBuffer());
    const pdf = await getDocumentProxy(buffer);
    const { text: pages } = await extractText(pdf, { mergePages: false });
    const resumeText = Array.isArray(pages) ? pages.join("\n\n") : String(pages);
    if (!resumeText.trim()) throw new Error("Could not extract any text from this PDF.");

    // 3. Persist the extracted text on the user's resume row.
    const { data: existing } = await supabase
      .from("resume")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();
    if (existing) {
      await supabase
        .from("resume")
        .update({ resume_text: resumeText, file_path: data.filePath })
        .eq("id", existing.id);
    } else {
      await supabase
        .from("resume")
        .insert({ user_id: userId, resume_text: resumeText, file_path: data.filePath });
    }

    const google = createGoogleGenerativeAI({ apiKey: key });
    const model = google("gemini-2.5-flash");

    const prompt = `You are an expert career coach and ATS resume analyst.
Analyze the RESUME against the JOB DESCRIPTION and respond with ONLY valid JSON
matching exactly this schema (no prose, no markdown fences):

{
  "match_score": 0-100 integer (fit vs job description),
  "ats_score": 0-100 integer (ATS friendliness),
  "missing_skills": string[] (skills required by the JD absent from resume),
  "important_keywords": string[] (JD keywords the resume should include),
  "resume_improvements": string[] (concrete rewrites/additions),
  "strengths": string[] (3-5 items),
  "weaknesses": string[] (3-5 items),
  "summary": "2-3 sentence overall assessment"
}

RESUME:
"""
${resumeText.slice(0, 15000)}
"""

JOB DESCRIPTION:
"""
${(data.jobDescription || "No job description provided — evaluate general market fit and ATS friendliness.").slice(0, 8000)}
"""`;

    let analysis: ResumeAnalysis;
    try {
      const { output } = await generateText({
        model,
        prompt,
        output: Output.object({ schema: AnalysisSchema }),
      });
      analysis = output;
    } catch (err) {
      // Fallback: retry without structured output, parse manually.
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("429")) throw new Error("Rate limit reached. Please try again in a moment.");
      if (msg.includes("402")) throw new Error("AI credits exhausted. Add credits to continue.");
      const { text } = await generateText({ model, prompt });
      analysis = AnalysisSchema.parse(safeParseJson(text));
    }

    // 5. Save analysis row.
    const { error: insErr } = await supabase.from("analysis").insert({
      user_id: userId,
      match_score: analysis.match_score,
      ats_score: analysis.ats_score,
      missing_skills: analysis.missing_skills,
      important_keywords: analysis.important_keywords,
      resume_improvements: analysis.resume_improvements,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      summary: analysis.summary,
      suggestions: analysis.resume_improvements.join("\n"),
      job_description: data.jobDescription || null,
    });
    if (insErr) console.error("Failed to save analysis:", insErr.message);

    return analysis;
  });
