//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-DJQAKNaq.js
var manifest = {
	"1414fe43bd3f9138e9d5c5b3da26967b2c20cd6375b800e9e051c65cbf366b73": {
		functionName: "generateRecruiterEmail_createServerFn_handler",
		importer: () => import("./_ssr/email-generator.functions-DrjmNspE.mjs")
	},
	"26f04725c6b304c8708c9b0012b15797fbbd0bec8487ae69c9ae3efa0fc02cc6": {
		functionName: "getLatestInterviewQuestions_createServerFn_handler",
		importer: () => import("./_ssr/interview-questions.functions-B0mtuV6h.mjs")
	},
	"42d8cba322580f4e465a63da9baa8818b999e556076297b91b99ecc71f52e09e": {
		functionName: "getAnalysisById_createServerFn_handler",
		importer: () => import("./_ssr/dashboard.functions-CAqcDCQx.mjs")
	},
	"78cb6936c0b3b84410e988d2f410b42adf3e6b2875702f913c7c40c3f43220cb": {
		functionName: "getLatestResumeFile_createServerFn_handler",
		importer: () => import("./_ssr/resume-analyzer.functions-BrKR1eRU.mjs")
	},
	"a1064e299f31cb4f7d016e9dcd002b92ac4789afb1482dc78da3dbc6374841e1": {
		functionName: "listAnalyses_createServerFn_handler",
		importer: () => import("./_ssr/dashboard.functions-CAqcDCQx.mjs")
	},
	"a51d00590d791ac4be5886ae24f7b057906902639e3f02a8b939ed5aee65b542": {
		functionName: "createApplication_createServerFn_handler",
		importer: () => import("./_ssr/applications.functions-BVVhsv4G.mjs")
	},
	"ad7285914c002b5d83f764f9d095460e344f3e861c732b823534f3292394050a": {
		functionName: "getApplications_createServerFn_handler",
		importer: () => import("./_ssr/applications.functions-BVVhsv4G.mjs")
	},
	"bf861c3b9b3234bd2ce6814b97f71c999148be093338c5b3531d9bc4373f634d": {
		functionName: "analyzeResume_createServerFn_handler",
		importer: () => import("./_ssr/resume-analyzer.functions-BrKR1eRU.mjs")
	},
	"cfef49492e68d29df6005ff48325c490872db26c4745a5439a6654810f97139a": {
		functionName: "updateApplication_createServerFn_handler",
		importer: () => import("./_ssr/applications.functions-BVVhsv4G.mjs")
	},
	"d8dd0f2f33ee8ce5e2ea2bfc749715b8e981950fa8bc0e14ec15d540b50039e9": {
		functionName: "getDashboardStats_createServerFn_handler",
		importer: () => import("./_ssr/dashboard.functions-CAqcDCQx.mjs")
	},
	"f2230dc746209b9f8095d9c0f0a17af8ce01170d30958f46bd3d310800d7cb66": {
		functionName: "deleteApplication_createServerFn_handler",
		importer: () => import("./_ssr/applications.functions-BVVhsv4G.mjs")
	},
	"ff1b7b5dd2d6b58a45913824fca4047380853cba361ff4ad863f18bdf6797168": {
		functionName: "generateInterviewQuestions_createServerFn_handler",
		importer: () => import("./_ssr/interview-questions.functions-B0mtuV6h.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
