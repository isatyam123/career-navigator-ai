import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useServerFn } from "./createSsrRpc-fhM2z-rE.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as CardContent, t as Card } from "./card-Bmhn9hYF.mjs";
import { t as PagePlaceholder } from "./PagePlaceholder-BXXXz2LN.mjs";
import { t as Progress } from "./progress-ChzuiZwr.mjs";
import { n as getLatestResumeFile } from "./resume-analyzer.functions-Det9C86E.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { C as FileText, L as Sparkles, z as LoaderCircle } from "../_libs/lucide-react.mjs";
import { r as listAnalyses } from "./dashboard.functions-CrPFd86C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resume-w7uNoZtc.js
var import_jsx_runtime = require_jsx_runtime();
function ResumePage() {
	const getResumeFn = useServerFn(getLatestResumeFile);
	const getAnalysisFn = useServerFn(listAnalyses);
	const { data: resumeFile, isLoading: isResumeLoading } = useQuery({
		queryKey: ["latest-resume"],
		queryFn: () => getResumeFn()
	});
	const { data: analyses, isLoading: isAnalysisLoading } = useQuery({
		queryKey: ["analysis-history"],
		queryFn: () => getAnalysisFn()
	});
	const latestAnalysis = analyses?.[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePlaceholder, {
		title: "Resume",
		description: "Manage and tailor your resume with AI.",
		icon: FileText,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-6 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "rounded-2xl border-border/60 shadow-card lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "p-8",
					children: isResumeLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-32 items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" })
					}) : resumeFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold",
							children: resumeFile.file_name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: ["Uploaded on ", new Date(resumeFile.uploaded_at).toLocaleString()]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "rounded-xl bg-gradient-brand text-white shadow-glow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/ai-analysis",
								children: "Upload New"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-dashed border-border/70 bg-gradient-subtle p-10 text-center text-sm text-muted-foreground flex flex-col items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-10 w-10 text-primary/40" }), "Your resume is securely stored. Run a new analysis anytime."]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-3 py-10 text-center text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-8 w-8 text-primary/60" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: "No resume found. Upload and analyze one to get started."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								className: "rounded-xl bg-gradient-brand text-white shadow-glow",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/ai-analysis",
									children: "Upload Resume"
								})
							})
						]
					})
				})
			}), resumeFile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "rounded-2xl border-border/60 shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-4 p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: "Latest Analysis Scores"
					}), isAnalysisLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-20 items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" })
					}) : latestAnalysis ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4",
						children: [
							latestAnalysis.ats_score !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "ATS Score"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-medium",
									children: [latestAnalysis.ats_score, "%"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: latestAnalysis.ats_score,
								className: "h-1.5 text-indigo-600 bg-indigo-500/10"
							})] }),
							latestAnalysis.match_score !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Match Score"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-medium",
									children: [latestAnalysis.match_score, "%"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: latestAnalysis.match_score,
								className: "h-1.5"
							})] }),
							!latestAnalysis.ats_score && !latestAnalysis.match_score && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "No scores available for the latest analysis."
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "No analysis history found."
					})]
				})
			})]
		})
	});
}
//#endregion
export { ResumePage as component };
