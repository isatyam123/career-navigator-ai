import { l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BITxcjnR.mjs";
import { At as objectType, Ot as arrayType, jt as stringType, kt as numberType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as createServerRpc } from "./createServerRpc-TAUNrjZd.mjs";
import { n as output_exports, t as generateText } from "../_libs/ai.mjs";
import { t as createGoogle } from "../_libs/ai-sdk__google.mjs";
import { n as getDocumentProxy, t as extractText } from "../_libs/unpdf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resume-analyzer.functions-BrKR1eRU.js
var InputSchema = objectType({
	filePath: stringType().min(1),
	fileName: stringType().min(1),
	jobDescription: stringType().default("")
});
var AnalysisSchema = objectType({
	match_score: numberType().min(0).max(100),
	ats_score: numberType().min(0).max(100),
	missing_skills: arrayType(stringType()),
	important_keywords: arrayType(stringType()),
	resume_improvements: arrayType(stringType()),
	strengths: arrayType(stringType()),
	weaknesses: arrayType(stringType()),
	summary: stringType()
});
function safeParseJson(raw) {
	try {
		return JSON.parse(raw);
	} catch {
		const match = raw.match(/\{[\s\S]*\}/);
		if (!match) throw new Error("AI returned no parseable JSON");
		return JSON.parse(match[0]);
	}
}
var getLatestResumeFile_createServerFn_handler = createServerRpc({
	id: "78cb6936c0b3b84410e988d2f410b42adf3e6b2875702f913c7c40c3f43220cb",
	name: "getLatestResumeFile",
	filename: "src/lib/resume-analyzer.functions.ts"
}, (opts) => getLatestResumeFile.__executeServer(opts));
var getLatestResumeFile = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getLatestResumeFile_createServerFn_handler, async ({ context }) => {
	const { supabase, userId } = context;
	const { data, error } = await supabase.from("resume_files").select("*").eq("user_id", userId).order("uploaded_at", { ascending: false }).limit(1).maybeSingle();
	if (error) throw new Error(error.message);
	return data;
});
var analyzeResume_createServerFn_handler = createServerRpc({
	id: "bf861c3b9b3234bd2ce6814b97f71c999148be093338c5b3531d9bc4373f634d",
	name: "analyzeResume",
	filename: "src/lib/resume-analyzer.functions.ts"
}, (opts) => analyzeResume.__executeServer(opts));
var analyzeResume = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => InputSchema.parse(input)).handler(analyzeResume_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const key = process.env.GEMINI_API_KEY;
	if (!key) throw new Error("Missing GEMINI_API_KEY");
	const { data: blob, error: dlErr } = await supabase.storage.from("resumes").download(data.filePath);
	if (dlErr || !blob) throw new Error(`Failed to download resume: ${dlErr?.message ?? "unknown"}`);
	const { text: pages } = await extractText(await getDocumentProxy(new Uint8Array(await blob.arrayBuffer())), { mergePages: false });
	const resumeText = Array.isArray(pages) ? pages.join("\n\n") : String(pages);
	if (!resumeText.trim()) throw new Error("Could not extract any text from this PDF.");
	const { data: existing } = await supabase.from("resume").select("id").eq("user_id", userId).maybeSingle();
	if (existing) await supabase.from("resume").update({
		resume_text: resumeText,
		file_path: data.filePath,
		filename: data.fileName
	}).eq("id", existing.id);
	else await supabase.from("resume").insert({
		user_id: userId,
		resume_text: resumeText,
		file_path: data.filePath,
		filename: data.fileName
	});
	const { data: existingResumeFile } = await supabase.from("resume_files").select("id").eq("user_id", userId).eq("file_name", data.fileName).maybeSingle();
	if (existingResumeFile) await supabase.from("resume_files").update({
		file_path: data.filePath,
		uploaded_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", existingResumeFile.id);
	else await supabase.from("resume_files").insert({
		user_id: userId,
		file_path: data.filePath,
		file_name: data.fileName
	});
	const model = createGoogle({ apiKey: key })("gemini-2.5-flash");
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
${resumeText.slice(0, 15e3)}
"""

JOB DESCRIPTION:
"""
${(data.jobDescription || "No job description provided — evaluate general market fit and ATS friendliness.").slice(0, 8e3)}
"""`;
	let analysis;
	try {
		const { output } = await generateText({
			model,
			prompt,
			output: output_exports.object({ schema: AnalysisSchema })
		});
		analysis = output;
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		if (msg.includes("429")) throw new Error("Rate limit reached. Please try again in a moment.");
		if (msg.includes("402")) throw new Error("AI credits exhausted. Add credits to continue.");
		const { text } = await generateText({
			model,
			prompt
		});
		analysis = AnalysisSchema.parse(safeParseJson(text));
	}
	const { error: insErr } = await supabase.from("analysis").insert({
		user_id: userId,
		resume_path: data.filePath,
		match_score: analysis.match_score,
		ats_score: analysis.ats_score,
		missing_skills: analysis.missing_skills,
		important_keywords: analysis.important_keywords,
		resume_improvements: analysis.resume_improvements,
		strengths: analysis.strengths,
		weaknesses: analysis.weaknesses,
		summary: analysis.summary,
		suggestions: analysis.resume_improvements.join("\n"),
		job_description: data.jobDescription || null
	});
	if (insErr) console.error("Failed to save analysis:", insErr.message);
	return analysis;
});
//#endregion
export { analyzeResume_createServerFn_handler, getLatestResumeFile_createServerFn_handler };
