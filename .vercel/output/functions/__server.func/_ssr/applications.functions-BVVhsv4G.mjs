import { l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BITxcjnR.mjs";
import { At as objectType, jt as stringType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as createServerRpc } from "./createServerRpc-TAUNrjZd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/applications.functions-BVVhsv4G.js
var getApplications_createServerFn_handler = createServerRpc({
	id: "ad7285914c002b5d83f764f9d095460e344f3e861c732b823534f3292394050a",
	name: "getApplications",
	filename: "src/lib/applications.functions.ts"
}, (opts) => getApplications.__executeServer(opts));
var getApplications = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getApplications_createServerFn_handler, async ({ context }) => {
	const { supabase, userId } = context;
	const { data, error } = await supabase.from("applications").select("*").eq("user_id", userId).order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data;
});
var CreateAppSchema = objectType({
	company: stringType().min(1),
	role: stringType().min(1),
	status: stringType().min(1),
	stage: stringType().min(1),
	deadline: stringType().optional().nullable()
});
var createApplication_createServerFn_handler = createServerRpc({
	id: "a51d00590d791ac4be5886ae24f7b057906902639e3f02a8b939ed5aee65b542",
	name: "createApplication",
	filename: "src/lib/applications.functions.ts"
}, (opts) => createApplication.__executeServer(opts));
var createApplication = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => CreateAppSchema.parse(input)).handler(createApplication_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const { error } = await supabase.from("applications").insert({
		user_id: userId,
		company: data.company,
		role: data.role,
		status: data.status,
		stage: data.stage,
		deadline: data.deadline || null
	});
	if (error) throw new Error(error.message);
});
var UpdateAppSchema = objectType({
	id: stringType(),
	company: stringType().min(1),
	role: stringType().min(1),
	status: stringType().min(1),
	stage: stringType().min(1),
	deadline: stringType().optional().nullable()
});
var updateApplication_createServerFn_handler = createServerRpc({
	id: "cfef49492e68d29df6005ff48325c490872db26c4745a5439a6654810f97139a",
	name: "updateApplication",
	filename: "src/lib/applications.functions.ts"
}, (opts) => updateApplication.__executeServer(opts));
var updateApplication = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => UpdateAppSchema.parse(input)).handler(updateApplication_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const { error } = await supabase.from("applications").update({
		company: data.company,
		role: data.role,
		status: data.status,
		stage: data.stage,
		deadline: data.deadline || null
	}).eq("id", data.id).eq("user_id", userId);
	if (error) throw new Error(error.message);
});
var DeleteAppSchema = objectType({ id: stringType() });
var deleteApplication_createServerFn_handler = createServerRpc({
	id: "f2230dc746209b9f8095d9c0f0a17af8ce01170d30958f46bd3d310800d7cb66",
	name: "deleteApplication",
	filename: "src/lib/applications.functions.ts"
}, (opts) => deleteApplication.__executeServer(opts));
var deleteApplication = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => DeleteAppSchema.parse(input)).handler(deleteApplication_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const { error } = await supabase.from("applications").delete().eq("id", data.id).eq("user_id", userId);
	if (error) throw new Error(error.message);
});
//#endregion
export { createApplication_createServerFn_handler, deleteApplication_createServerFn_handler, getApplications_createServerFn_handler, updateApplication_createServerFn_handler };
