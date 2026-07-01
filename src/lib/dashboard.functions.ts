import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export type AnalysisRow = {
  id: string;
  created_at: string;
  match_score: number | null;
  ats_score: number | null;
  summary: string | null;
  job_description: string | null;
  strengths: string[];
  weaknesses: string[];
  missing_skills: string[];
  important_keywords: string[];
  resume_improvements: string[];
  generated_email: string | null;
  interview_questions: JsonValue;
};

function coerceStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === "string");
  return [];
}

function normalize(row: Record<string, unknown>): AnalysisRow {
  return {
    id: String(row.id),
    created_at: String(row.created_at),
    match_score: (row.match_score as number | null) ?? null,
    ats_score: (row.ats_score as number | null) ?? null,
    summary: (row.summary as string | null) ?? null,
    job_description: (row.job_description as string | null) ?? null,
    strengths: coerceStringArray(row.strengths),
    weaknesses: coerceStringArray(row.weaknesses),
    missing_skills: coerceStringArray(row.missing_skills),
    important_keywords: coerceStringArray(row.important_keywords),
    resume_improvements: coerceStringArray(row.resume_improvements),
    generated_email: (row.generated_email as string | null) ?? null,
    interview_questions: (row.interview_questions ?? null) as JsonValue,
  };
}

export const getDashboardStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const [apps, analysesCount, recent] = await Promise.all([
      supabase
        .from("applications")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId),
      supabase.from("analysis").select("id", { count: "exact", head: true }).eq("user_id", userId),
      supabase
        .from("analysis")
        .select("id, created_at, match_score, ats_score, summary, job_description")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    const latestScore = recent.data?.find((r) => r.match_score !== null)?.match_score ?? null;

    return {
      totalApplications: apps.count ?? 0,
      totalAnalyses: analysesCount.count ?? 0,
      latestResumeScore: latestScore as number | null,
      recentAnalyses: (recent.data ?? []).map((r) => ({
        id: String(r.id),
        created_at: String(r.created_at),
        match_score: (r.match_score as number | null) ?? null,
        ats_score: (r.ats_score as number | null) ?? null,
        summary: (r.summary as string | null) ?? null,
        job_description: (r.job_description as string | null) ?? null,
      })),
    };
  });

export const listAnalyses = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("analysis")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((r) => normalize(r as Record<string, unknown>));
  });

export const getAnalysisById = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => {
    const obj = input as { id?: string };
    if (!obj?.id) throw new Error("id required");
    return { id: obj.id };
  })
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("analysis")
      .select("*")
      .eq("user_id", userId)
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return null;
    return normalize(row as Record<string, unknown>);
  });
