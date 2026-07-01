import { i as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useServerFn } from "./createSsrRpc-fhM2z-rE.mjs";
import { t as supabase } from "./client-CwjOB3K7.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-Bmhn9hYF.mjs";
import { t as Progress } from "./progress-ChzuiZwr.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { L as Sparkles, N as ArrowRight, S as Gauge, i as TrendingUp, j as Briefcase, y as History, z as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as getDashboardStats } from "./dashboard.functions-CrPFd86C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-DA0TGEnN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useDisplayName() {
	const [name, setName] = (0, import_react.useState)("there");
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(({ data }) => {
			const u = data.user;
			if (!u) return;
			const meta = u.user_metadata ?? {};
			setName((meta.full_name || meta.name || u.email?.split("@")[0] || "there").split(" ")[0]);
		});
	}, []);
	return name;
}
function Dashboard() {
	const fn = useServerFn(getDashboardStats);
	const name = useDisplayName();
	const { data, isLoading, error } = useQuery({
		queryKey: ["dashboard-stats"],
		queryFn: () => fn()
	});
	const stats = [
		{
			label: "Total Applications",
			value: data?.totalApplications ?? 0,
			icon: Briefcase,
			tone: "from-violet-500 to-indigo-500"
		},
		{
			label: "Total Analyses",
			value: data?.totalAnalyses ?? 0,
			icon: Sparkles,
			tone: "from-indigo-500 to-blue-500"
		},
		{
			label: "Latest Resume Score",
			value: data?.latestResumeScore != null ? `${data.latestResumeScore}` : "—",
			icon: Gauge,
			tone: "from-fuchsia-500 to-purple-500",
			suffix: data?.latestResumeScore != null ? "/100" : ""
		},
		{
			label: "Recent Analyses",
			value: data?.recentAnalyses.length ?? 0,
			icon: History,
			tone: "from-rose-500 to-pink-500"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-7xl flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm text-muted-foreground",
						children: ["Welcome back, ", name]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-3xl font-semibold tracking-tight md:text-4xl",
						children: [
							"Your ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient-brand",
								children: "career pipeline"
							}),
							" at a glance"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-sm text-muted-foreground",
						children: "Track every application, prep smarter with AI, and never miss a deadline."
					})
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "rounded-2xl border-destructive/40 bg-destructive/5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4 text-sm text-destructive",
					children: ["Failed to load dashboard: ", error.message]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "group relative overflow-hidden rounded-2xl border-border/60 shadow-card transition hover:-translate-y-0.5 hover:shadow-glow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.tone}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-col gap-4 p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium text-muted-foreground",
								children: s.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.tone} text-white shadow-glow`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-5 w-5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end justify-between",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-4xl font-semibold tracking-tight",
								children: [isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) : s.value, "suffix" in s && s.suffix ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 text-base font-normal text-muted-foreground",
									children: s.suffix
								}) : null]
							})
						})]
					})]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-2xl border-border/60 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex flex-row items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-lg",
						children: "Recent Analyses"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Your latest resume analyses, newest first"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						className: "gap-1 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/history",
							children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-3",
					children: [
						isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-center py-10 text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin" })
						}),
						!isLoading && (!data || data.recentAnalyses.length === 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-3 py-10 text-center text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-8 w-8 text-primary/60" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: "No analyses yet. Run your first resume analysis to see it here."
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
						}),
						data?.recentAnalyses.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/history/$id",
							params: { id: a.id },
							className: "group flex flex-col gap-3 rounded-xl border border-border/60 bg-muted/20 p-4 transition hover:border-primary/40 hover:bg-muted/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-sm font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "truncate",
											children: [a.summary?.slice(0, 90) || "Resume analysis", a.summary && a.summary.length > 90 ? "…" : ""]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-xs text-muted-foreground",
										children: new Date(a.created_at).toLocaleString()
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex shrink-0 gap-2",
									children: [a.match_score != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "outline",
										className: "rounded-full border-primary/20 bg-primary/5 text-primary",
										children: ["Match ", a.match_score]
									}), a.ats_score != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "outline",
										className: "rounded-full border-indigo-500/20 bg-indigo-500/5 text-indigo-600",
										children: ["ATS ", a.ats_score]
									})]
								})]
							}), a.match_score != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: a.match_score,
								className: "h-1.5"
							})]
						}, a.id))
					]
				})]
			})
		]
	});
}
//#endregion
export { Dashboard as component };
