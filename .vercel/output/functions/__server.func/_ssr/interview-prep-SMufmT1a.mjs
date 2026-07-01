import { i as __toESM } from "../_runtime.mjs";
import { l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useServerFn, t as createSsrRpc } from "./createSsrRpc-fhM2z-rE.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BITxcjnR.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as CardContent, t as Card } from "./card-Bmhn9hYF.mjs";
import { t as PagePlaceholder } from "./PagePlaceholder-BXXXz2LN.mjs";
import { t as Textarea } from "./textarea-Cp94w9lz.mjs";
import { n as CollapsibleTrigger$1, r as Root, t as CollapsibleContent$1 } from "../_libs/@radix-ui/react-collapsible+[...].mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { At as objectType, jt as stringType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { L as Sparkles, V as CodeXml, b as HeartHandshake, k as ChevronDown, n as Users, p as MessageSquare, u as RefreshCw, z as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/interview-prep-SMufmT1a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Collapsible = Root;
var CollapsibleTrigger = CollapsibleTrigger$1;
var CollapsibleContent = CollapsibleContent$1;
var InputSchema = objectType({ jobDescription: stringType().default("") });
var generateInterviewQuestions = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => InputSchema.parse(input)).handler(createSsrRpc("ff1b7b5dd2d6b58a45913824fca4047380853cba361ff4ad863f18bdf6797168"));
var getLatestInterviewQuestions = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("26f04725c6b304c8708c9b0012b15797fbbd0bec8487ae69c9ae3efa0fc02cc6"));
function InterviewPrepPage() {
	const [jobDescription, setJobDescription] = (0, import_react.useState)("");
	const [questions, setQuestions] = (0, import_react.useState)(null);
	const loadFn = useServerFn(getLatestInterviewQuestions);
	const genFn = useServerFn(generateInterviewQuestions);
	useQuery({
		queryKey: ["latest-interview-questions"],
		queryFn: async () => {
			const res = await loadFn();
			if (res.questions) setQuestions(res.questions);
			if (res.jobDescription) setJobDescription(res.jobDescription);
			return res;
		}
	});
	const mutation = useMutation({
		mutationFn: () => genFn({ data: { jobDescription } }),
		onSuccess: (data) => {
			setQuestions(data);
			toast.success("Interview questions ready");
		},
		onError: (err) => toast.error(err.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PagePlaceholder, {
		title: "Interview Prep",
		description: "AI-generated interview questions tailored to your resume and target role.",
		icon: MessageSquare,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "mb-6 rounded-2xl border-border/60 shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-4 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Job description (optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Paste the JD to sharpen the questions. Leave blank to reuse your last analysis."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: jobDescription,
							onChange: (e) => setJobDescription(e.target.value),
							placeholder: "Paste job description here…",
							className: "min-h-[120px] rounded-xl bg-muted/30"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => mutation.mutate(),
								disabled: mutation.isPending,
								className: "rounded-xl bg-gradient-brand text-white shadow-glow gap-2",
								children: mutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Generating…"] }) : questions ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" }), " Regenerate Questions"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " Generate Questions"] })
							})
						})
					]
				})
			}),
			!questions && !mutation.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "rounded-2xl border-border/60 shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex min-h-[240px] flex-col items-center justify-center text-center text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mb-3 h-10 w-10 text-primary/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: "Generate a personalized question bank from your resume and JD."
					})]
				})
			}),
			mutation.isPending && !questions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "rounded-2xl border-border/60 shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex min-h-[240px] flex-col items-center justify-center gap-3 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: "Preparing tailored interview questions..."
					})]
				})
			}),
			questions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionSection, {
						icon: CodeXml,
						title: "Technical Questions",
						tone: "text-primary",
						items: questions.technical
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionSection, {
						icon: Users,
						title: "HR Questions",
						tone: "text-indigo-500",
						items: questions.hr
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionSection, {
						icon: HeartHandshake,
						title: "Behavioral Questions",
						tone: "text-emerald-500",
						items: questions.behavioral
					})
				]
			})
		]
	});
}
function QuestionSection({ icon: Icon, title, tone, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "rounded-2xl border-border/60 shadow-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-5 w-5 ${tone}` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-semibold",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: "ml-auto rounded-lg",
						children: items.length
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-2",
				children: items.map((q, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionItem, {
					index: i + 1,
					question: q.question,
					answerTip: q.answer_tip
				}, i))
			})]
		})
	});
}
function QuestionItem({ index, question, answerTip }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Collapsible, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CollapsibleTrigger, {
			className: "group flex w-full items-center gap-3 rounded-xl border border-border/60 bg-muted/20 p-4 text-left transition hover:border-primary/40 hover:bg-muted/40",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-brand text-xs font-semibold text-white",
					children: index
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex-1 text-sm font-medium",
					children: question
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}` })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 rounded-xl border border-border/40 bg-background/60 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-1 text-xs font-semibold uppercase tracking-wider text-primary",
				children: "Answer tip"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted-foreground",
				children: answerTip
			})]
		}) })]
	});
}
//#endregion
export { InterviewPrepPage as component };
