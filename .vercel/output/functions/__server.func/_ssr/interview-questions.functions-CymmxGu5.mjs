import { l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-B67yFdw9.mjs";
import { At as objectType, Ot as arrayType, jt as stringType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as createServerRpc } from "./createServerRpc-TAUNrjZd.mjs";
import { n as output_exports, t as generateText } from "../_libs/ai.mjs";
import { t as createGoogle } from "../_libs/ai-sdk__google.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/interview-questions.functions-CymmxGu5.js
var InputSchema = objectType({ jobDescription: stringType().default("") });
var QuestionSchema = objectType({
	question: stringType(),
	answer_tip: stringType()
});
var QuestionsSchema = objectType({
	technical: arrayType(QuestionSchema),
	hr: arrayType(QuestionSchema),
	behavioral: arrayType(QuestionSchema)
});
var generateInterviewQuestions_createServerFn_handler = createServerRpc({
	id: "ff1b7b5dd2d6b58a45913824fca4047380853cba361ff4ad863f18bdf6797168",
	name: "generateInterviewQuestions",
	filename: "src/lib/interview-questions.functions.ts"
}, (opts) => generateInterviewQuestions.__executeServer(opts));
var generateInterviewQuestions = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => InputSchema.parse(input)).handler(generateInterviewQuestions_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const key = process.env.GEMINI_API_KEY;
	if (!key) throw new Error("Missing GEMINI_API_KEY");
	const { data: resumeRow } = await supabase.from("resume").select("resume_text").eq("user_id", userId).maybeSingle();
	const resumeText = (resumeRow?.resume_text ?? "").slice(0, 8e3);
	let jobDescription = data.jobDescription;
	if (!jobDescription) {
		const { data: latest } = await supabase.from("analysis").select("job_description").eq("user_id", userId).order("created_at", { ascending: false }).limit(1).maybeSingle();
		jobDescription = latest?.job_description ?? "";
	}
	const model = createGoogle({ apiKey: key })("gemini-2.5-flash");
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
${(jobDescription || "General role — infer from resume.").slice(0, 6e3)}
"""`;
	let questions;
	try {
		const { output } = await generateText({
			model,
			prompt,
			output: output_exports.object({ schema: QuestionsSchema })
		});
		questions = output;
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		if (msg.includes("429")) throw new Error("Rate limit reached. Please try again in a moment.");
		if (msg.includes("402")) throw new Error("AI credits exhausted. Add credits to continue.");
		throw new Error(`Failed to generate questions: ${msg}`);
	}
	const { data: latest } = await supabase.from("analysis").select("id").eq("user_id", userId).order("created_at", { ascending: false }).limit(1).maybeSingle();
	if (latest) await supabase.from("analysis").update({ interview_questions: questions }).eq("id", latest.id);
	else await supabase.from("analysis").insert({
		user_id: userId,
		interview_questions: questions
	});
	return questions;
});
var getLatestInterviewQuestions_createServerFn_handler = createServerRpc({
	id: "26f04725c6b304c8708c9b0012b15797fbbd0bec8487ae69c9ae3efa0fc02cc6",
	name: "getLatestInterviewQuestions",
	filename: "src/lib/interview-questions.functions.ts"
}, (opts) => getLatestInterviewQuestions.__executeServer(opts));
var getLatestInterviewQuestions = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getLatestInterviewQuestions_createServerFn_handler, async ({ context }) => {
	const { supabase, userId } = context;
	const { data } = await supabase.from("analysis").select("interview_questions, job_description").eq("user_id", userId).order("created_at", { ascending: false }).limit(1).maybeSingle();
	const q = data?.interview_questions;
	if (!q || !q.technical) return {
		questions: null,
		jobDescription: data?.job_description ?? ""
	};
	return {
		questions: q,
		jobDescription: data?.job_description ?? ""
	};
});
//#endregion
export { generateInterviewQuestions_createServerFn_handler, getLatestInterviewQuestions_createServerFn_handler };
