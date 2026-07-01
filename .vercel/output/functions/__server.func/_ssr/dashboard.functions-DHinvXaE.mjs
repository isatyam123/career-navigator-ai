import { l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-B67yFdw9.mjs";
import { t as createServerRpc } from "./createServerRpc-TAUNrjZd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.functions-DHinvXaE.js
function coerceStringArray(v) {
	if (Array.isArray(v)) return v.filter((x) => typeof x === "string");
	return [];
}
function normalize(row) {
	return {
		id: String(row.id),
		created_at: String(row.created_at),
		match_score: row.match_score ?? null,
		ats_score: row.ats_score ?? null,
		summary: row.summary ?? null,
		job_description: row.job_description ?? null,
		strengths: coerceStringArray(row.strengths),
		weaknesses: coerceStringArray(row.weaknesses),
		missing_skills: coerceStringArray(row.missing_skills),
		important_keywords: coerceStringArray(row.important_keywords),
		resume_improvements: coerceStringArray(row.resume_improvements),
		generated_email: row.generated_email ?? null,
		interview_questions: row.interview_questions ?? null
	};
}
var getDashboardStats_createServerFn_handler = createServerRpc({
	id: "d8dd0f2f33ee8ce5e2ea2bfc749715b8e981950fa8bc0e14ec15d540b50039e9",
	name: "getDashboardStats",
	filename: "src/lib/dashboard.functions.ts"
}, (opts) => getDashboardStats.__executeServer(opts));
var getDashboardStats = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getDashboardStats_createServerFn_handler, async ({ context }) => {
	const { supabase, userId } = context;
	const [apps, analysesCount, recent] = await Promise.all([
		supabase.from("applications").select("id", {
			count: "exact",
			head: true
		}).eq("user_id", userId),
		supabase.from("analysis").select("id", {
			count: "exact",
			head: true
		}).eq("user_id", userId),
		supabase.from("analysis").select("id, created_at, match_score, ats_score, summary, job_description").eq("user_id", userId).order("created_at", { ascending: false }).limit(5)
	]);
	const latestScore = recent.data?.find((r) => r.ats_score !== null)?.ats_score ?? null;
	return {
		totalApplications: apps.count ?? 0,
		totalAnalyses: analysesCount.count ?? 0,
		latestResumeScore: latestScore,
		recentAnalyses: (recent.data ?? []).map((r) => ({
			id: String(r.id),
			created_at: String(r.created_at),
			match_score: r.match_score ?? null,
			ats_score: r.ats_score ?? null,
			summary: r.summary ?? null,
			job_description: r.job_description ?? null
		}))
	};
});
var listAnalyses_createServerFn_handler = createServerRpc({
	id: "a1064e299f31cb4f7d016e9dcd002b92ac4789afb1482dc78da3dbc6374841e1",
	name: "listAnalyses",
	filename: "src/lib/dashboard.functions.ts"
}, (opts) => listAnalyses.__executeServer(opts));
var listAnalyses = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listAnalyses_createServerFn_handler, async ({ context }) => {
	const { supabase, userId } = context;
	const { data, error } = await supabase.from("analysis").select("*").eq("user_id", userId).order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return (data ?? []).map((r) => normalize(r));
});
var getAnalysisById_createServerFn_handler = createServerRpc({
	id: "42d8cba322580f4e465a63da9baa8818b999e556076297b91b99ecc71f52e09e",
	name: "getAnalysisById",
	filename: "src/lib/dashboard.functions.ts"
}, (opts) => getAnalysisById.__executeServer(opts));
var getAnalysisById = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((input) => {
	const obj = input;
	if (!obj?.id) throw new Error("id required");
	return { id: obj.id };
}).handler(getAnalysisById_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const { data: row, error } = await supabase.from("analysis").select("*").eq("user_id", userId).eq("id", data.id).maybeSingle();
	if (error) throw new Error(error.message);
	if (!row) return null;
	return normalize(row);
});
//#endregion
export { getAnalysisById_createServerFn_handler, getDashboardStats_createServerFn_handler, listAnalyses_createServerFn_handler };
