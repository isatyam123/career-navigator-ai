import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useServerFn } from "./createSsrRpc-IMwUtkkP.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as CardContent, t as Card } from "./card-Bmhn9hYF.mjs";
import { t as PagePlaceholder } from "./PagePlaceholder-BXXXz2LN.mjs";
import { t as Progress } from "./progress-ChzuiZwr.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { H as CircleCheck, I as TriangleAlert, L as Sparkles, P as ArrowLeft, g as Lightbulb, m as Mail, o as Target, p as MessageSquare, v as KeyRound, y as History, z as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as getAnalysisById } from "./dashboard.functions-DuQkyjfe.mjs";
import { t as Route } from "./history._id-DtghPzB3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history._id-BWWQlZTY.js
var import_jsx_runtime = require_jsx_runtime();
function AnalysisDetailPage() {
	const { id } = Route.useParams();
	const fn = useServerFn(getAnalysisById);
	const { data, isLoading, error } = useQuery({
		queryKey: ["analysis", id],
		queryFn: () => fn({ data: { id } })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PagePlaceholder, {
		title: "Analysis Detail",
		description: data ? `Saved ${new Date(data.created_at).toLocaleString()}` : "Loading saved analysis…",
		icon: History,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "ghost",
				size: "sm",
				className: "mb-4 gap-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/history",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to history"]
				})
			}),
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-center py-16 text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin" })
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "rounded-2xl border-destructive/40 bg-destructive/5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "p-4 text-sm text-destructive",
					children: error.message
				})
			}),
			!isLoading && !data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "rounded-2xl border-border/60 shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "p-6 text-sm text-muted-foreground",
					children: "Analysis not found."
				})
			}),
			data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreCard, {
							label: "Match Score",
							value: data.match_score
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreCard, {
							label: "ATS Score",
							value: data.ats_score
						})]
					}),
					data.summary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "rounded-2xl border-border/60 shadow-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center gap-2 text-sm font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" }), " AI Summary"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-muted-foreground",
								children: data.summary
							})]
						})
					}),
					data.job_description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "rounded-2xl border-border/60 shadow-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-2 text-sm font-semibold",
								children: "Job Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: "max-h-64 overflow-auto whitespace-pre-wrap rounded-xl bg-muted/40 p-4 font-sans text-xs text-muted-foreground",
								children: data.job_description
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListCard, {
							icon: CircleCheck,
							tone: "text-emerald-500",
							title: "Strengths",
							items: data.strengths
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListCard, {
							icon: TriangleAlert,
							tone: "text-amber-500",
							title: "Weaknesses",
							items: data.weaknesses
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListCard, {
						icon: Lightbulb,
						tone: "text-primary",
						title: "Resume Improvements",
						items: data.resume_improvements
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCard, {
							icon: Target,
							title: "Missing Skills",
							items: data.missing_skills
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCard, {
							icon: KeyRound,
							title: "Important Keywords",
							items: data.important_keywords
						})]
					}),
					data.generated_email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavedEmails, { raw: data.generated_email }),
					data.interview_questions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavedQuestions, { raw: data.interview_questions }) : null
				]
			})
		]
	});
}
function ScoreCard({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "rounded-2xl border-border/60 shadow-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-wider text-muted-foreground",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-4xl font-semibold text-gradient-brand",
					children: value ?? "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: value ?? 0,
					className: "mt-3 h-2"
				})
			]
		})
	});
}
function ListCard({ icon: Icon, tone, title, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "rounded-2xl border-border/60 shadow-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center gap-2 text-sm font-semibold",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 ${tone}` }),
					" ",
					title
				]
			}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Nothing to report."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2 text-sm text-muted-foreground",
				children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary",
						children: "•"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: it })]
				}, i))
			})]
		})
	});
}
function BadgeCard({ icon: Icon, title, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "rounded-2xl border-border/60 shadow-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center gap-2 text-sm font-semibold",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-primary" }),
					" ",
					title
				]
			}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "None detected."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: items.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "secondary",
					className: "rounded-lg",
					children: s
				}, s))
			})]
		})
	});
}
function SavedEmails({ raw }) {
	let parsed = null;
	try {
		parsed = JSON.parse(raw);
	} catch {
		parsed = null;
	}
	if (!parsed) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "rounded-2xl border-border/60 shadow-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex flex-col gap-4 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 text-primary" }), " Recruiter Emails"]
				}),
				parsed.subject && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailBlock, {
					label: "Subject",
					content: parsed.subject,
					mono: true
				}),
				parsed.application_email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailBlock, {
					label: "Application Email",
					content: parsed.application_email
				}),
				parsed.follow_up_email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailBlock, {
					label: "Follow-up Email",
					content: parsed.follow_up_email
				})
			]
		})
	});
}
function EmailBlock({ label, content, mono }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
		className: `whitespace-pre-wrap break-words rounded-xl bg-muted/40 p-4 text-sm text-foreground/90 ${mono ? "font-mono" : "font-sans leading-relaxed"}`,
		children: content
	})] });
}
function SavedQuestions({ raw }) {
	const q = raw ?? {};
	const sections = [
		["Technical", q.technical],
		["HR", q.hr],
		["Behavioral", q.behavioral]
	];
	if (!sections.some(([, arr]) => Array.isArray(arr) && arr.length > 0)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "rounded-2xl border-border/60 shadow-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex flex-col gap-4 p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-sm font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4 text-primary" }), " Interview Questions"]
			}), sections.map(([label, arr]) => arr && arr.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "list-decimal space-y-1 pl-5 text-sm text-muted-foreground",
				children: arr.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: it.question }, i))
			})] }, label) : null)]
		})
	});
}
//#endregion
export { AnalysisDetailPage as component };
