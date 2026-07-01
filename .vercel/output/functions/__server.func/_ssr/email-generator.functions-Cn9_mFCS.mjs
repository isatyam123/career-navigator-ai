import { l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-B67yFdw9.mjs";
import { At as objectType, Ot as arrayType, jt as stringType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as createServerRpc } from "./createServerRpc-TAUNrjZd.mjs";
import { n as output_exports, t as generateText } from "../_libs/ai.mjs";
import { t as createGoogle } from "../_libs/ai-sdk__google.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/email-generator.functions-Cn9_mFCS.js
var InputSchema = objectType({
	jobDescription: stringType().default(""),
	summary: stringType().default(""),
	strengths: arrayType(stringType()).default([]),
	importantKeywords: arrayType(stringType()).default([])
});
var EmailSchema = objectType({
	subject: stringType(),
	application_email: stringType(),
	follow_up_email: stringType()
});
var generateRecruiterEmail_createServerFn_handler = createServerRpc({
	id: "1414fe43bd3f9138e9d5c5b3da26967b2c20cd6375b800e9e051c65cbf366b73",
	name: "generateRecruiterEmail",
	filename: "src/lib/email-generator.functions.ts"
}, (opts) => generateRecruiterEmail.__executeServer(opts));
var generateRecruiterEmail = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => InputSchema.parse(input)).handler(generateRecruiterEmail_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const key = process.env.GEMINI_API_KEY;
	if (!key) throw new Error("Missing GEMINI_API_KEY");
	const { data: resumeRow } = await supabase.from("resume").select("resume_text").eq("user_id", userId).maybeSingle();
	const resumeText = (resumeRow?.resume_text ?? "").slice(0, 8e3);
	const model = createGoogle({ apiKey: key })("gemini-2.5-flash");
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
${(data.jobDescription || "General application — no specific JD.").slice(0, 6e3)}
"""

PRIOR ANALYSIS SUMMARY: ${data.summary || "N/A"}
KEY STRENGTHS: ${data.strengths.join(", ") || "N/A"}
IMPORTANT KEYWORDS: ${data.importantKeywords.join(", ") || "N/A"}`;
	let emails;
	try {
		const { output } = await generateText({
			model,
			prompt,
			output: output_exports.object({ schema: EmailSchema })
		});
		emails = output;
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		if (msg.includes("429")) throw new Error("Rate limit reached. Please try again in a moment.");
		if (msg.includes("402")) throw new Error("AI credits exhausted. Add credits to continue.");
		throw new Error(`Failed to generate email: ${msg}`);
	}
	const { data: latest } = await supabase.from("analysis").select("id").eq("user_id", userId).order("created_at", { ascending: false }).limit(1).maybeSingle();
	const serialized = JSON.stringify(emails);
	if (latest) await supabase.from("analysis").update({ generated_email: serialized }).eq("id", latest.id);
	else await supabase.from("analysis").insert({
		user_id: userId,
		generated_email: serialized
	});
	return emails;
});
//#endregion
export { generateRecruiterEmail_createServerFn_handler };
