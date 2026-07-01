import { l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as createSsrRpc } from "./createSsrRpc-fhM2z-rE.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BITxcjnR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.functions-CrPFd86C.js
var getDashboardStats = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("d8dd0f2f33ee8ce5e2ea2bfc749715b8e981950fa8bc0e14ec15d540b50039e9"));
var listAnalyses = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("a1064e299f31cb4f7d016e9dcd002b92ac4789afb1482dc78da3dbc6374841e1"));
var getAnalysisById = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((input) => {
	const obj = input;
	if (!obj?.id) throw new Error("id required");
	return { id: obj.id };
}).handler(createSsrRpc("42d8cba322580f4e465a63da9baa8818b999e556076297b91b99ecc71f52e09e"));
//#endregion
export { getDashboardStats as n, listAnalyses as r, getAnalysisById as t };
