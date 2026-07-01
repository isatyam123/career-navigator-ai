import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useServerFn } from "./createSsrRpc-fhM2z-rE.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as CardContent, t as Card } from "./card-Bmhn9hYF.mjs";
import { t as PagePlaceholder } from "./PagePlaceholder-BXXXz2LN.mjs";
import { t as Progress } from "./progress-ChzuiZwr.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { L as Sparkles, N as ArrowRight, y as History, z as LoaderCircle } from "../_libs/lucide-react.mjs";
import { r as listAnalyses } from "./dashboard.functions-CrPFd86C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history-BhT-pLPX.js
var import_jsx_runtime = require_jsx_runtime();
function HistoryPage() {
	const fn = useServerFn(listAnalyses);
	const { data, isLoading, error } = useQuery({
		queryKey: ["analysis-history"],
		queryFn: () => fn()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PagePlaceholder, {
		title: "Analysis History",
		description: "Every resume analysis you've run, newest first. Open one to review without spending AI credits.",
		icon: History,
		children: [
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-center py-16 text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin" })
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "rounded-2xl border-destructive/40 bg-destructive/5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4 text-sm text-destructive",
					children: ["Failed to load: ", error.message]
				})
			}),
			!isLoading && data && data.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "rounded-2xl border-border/60 shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col items-center gap-3 py-16 text-center text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-10 w-10 text-primary/60" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: "No analyses yet. Run your first one to build your history."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "rounded-xl bg-gradient-brand text-white shadow-glow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/ai-analysis",
								children: "Analyze a resume"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3",
				children: data?.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/history/$id",
					params: { id: a.id },
					className: "group rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: new Date(a.created_at).toLocaleString()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 text-sm font-medium",
									children: [a.summary?.slice(0, 140) || "Resume analysis", a.summary && a.summary.length > 140 ? "…" : ""]
								}),
								a.match_score != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
									value: a.match_score,
									className: "mt-3 h-1.5"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 flex-col items-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [a.match_score != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "outline",
									className: "rounded-full border-primary/20 bg-primary/5 text-primary",
									children: ["Match ", a.match_score]
								}), a.ats_score != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "outline",
									className: "rounded-full border-indigo-500/20 bg-indigo-500/5 text-indigo-600",
									children: ["ATS ", a.ats_score]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 text-xs text-primary opacity-0 transition group-hover:opacity-100",
								children: ["Open ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
							})]
						})]
					})
				}, a.id))
			})
		]
	});
}
//#endregion
export { HistoryPage as component };
