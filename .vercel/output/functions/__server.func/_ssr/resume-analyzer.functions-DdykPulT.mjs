import { l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as createSsrRpc } from "./createSsrRpc-IMwUtkkP.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-B67yFdw9.mjs";
import { At as objectType, jt as stringType } from "../_libs/@ai-sdk/gateway+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resume-analyzer.functions-DdykPulT.js
var InputSchema = objectType({
	filePath: stringType().min(1),
	fileName: stringType().min(1),
	jobDescription: stringType().default("")
});
var getLatestResumeFile = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("78cb6936c0b3b84410e988d2f410b42adf3e6b2875702f913c7c40c3f43220cb"));
var analyzeResume = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => InputSchema.parse(input)).handler(createSsrRpc("bf861c3b9b3234bd2ce6814b97f71c999148be093338c5b3531d9bc4373f634d"));
//#endregion
export { getLatestResumeFile as n, analyzeResume as t };
