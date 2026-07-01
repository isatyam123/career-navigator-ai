import { i as __toESM } from "../_runtime.mjs";
import { l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useServerFn, t as createSsrRpc } from "./createSsrRpc-IMwUtkkP.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-B67yFdw9.mjs";
import { t as supabase } from "./client-CwjOB3K7.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as CardContent, t as Card } from "./card-Bmhn9hYF.mjs";
import { t as PagePlaceholder } from "./PagePlaceholder-BXXXz2LN.mjs";
import { t as Textarea } from "./textarea-Cp94w9lz.mjs";
import { t as Progress } from "./progress-ChzuiZwr.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { At as objectType, Ot as arrayType, jt as stringType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as analyzeResume } from "./resume-analyzer.functions-DdykPulT.mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as Check, C as FileText, F as WandSparkles, H as CircleCheck, I as TriangleAlert, L as Sparkles, T as Clock, c as Send, g as Lightbulb, m as Mail, o as Target, r as Upload, t as X, v as KeyRound, w as Copy, z as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-analysis-C3NThvzj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var InputSchema = objectType({
	jobDescription: stringType().default(""),
	summary: stringType().default(""),
	strengths: arrayType(stringType()).default([]),
	importantKeywords: arrayType(stringType()).default([])
});
var generateRecruiterEmail = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => InputSchema.parse(input)).handler(createSsrRpc("1414fe43bd3f9138e9d5c5b3da26967b2c20cd6375b800e9e051c65cbf366b73"));
function AiAnalysisPage() {
	const [file, setFile] = (0, import_react.useState)(null);
	const [jobDescription, setJobDescription] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	const inputRef = (0, import_react.useRef)(null);
	const fn = useServerFn(analyzeResume);
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async () => {
			if (!file) throw new Error("Please choose a PDF resume first.");
			if (file.type !== "application/pdf") throw new Error("Only PDF files are supported.");
			if (file.size > 10 * 1024 * 1024) throw new Error("PDF must be under 10 MB.");
			const { data: userData, error: userErr } = await supabase.auth.getUser();
			if (userErr || !userData.user) throw new Error("You need to be signed in.");
			const filePath = `${userData.user.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
			const { error: upErr } = await supabase.storage.from("resumes").upload(filePath, file, {
				contentType: "application/pdf",
				upsert: false
			});
			if (upErr) throw new Error(`Upload failed: ${upErr.message}`);
			return fn({ data: {
				filePath,
				fileName: file.name,
				jobDescription
			} });
		},
		onSuccess: (data) => {
			setResult(data);
			queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
			queryClient.invalidateQueries({ queryKey: ["analysis-history"] });
			toast.success("Analysis complete");
		},
		onError: (err) => toast.error(err.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePlaceholder, {
		title: "AI Resume Analyzer",
		description: "Upload your resume PDF and optionally paste a job description. AI will analyze your resume, calculate ATS compatibility, and provide personalized recommendations.",
		icon: Sparkles,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "rounded-2xl border-border/60 shadow-card lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-4 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Resume (PDF)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: () => inputRef.current?.click(),
							className: "group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/60 bg-muted/20 p-6 text-center transition hover:border-primary/60 hover:bg-muted/40",
							children: [file ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex w-full items-center justify-between gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: file.name
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: (e) => {
										e.stopPropagation();
										setFile(null);
									},
									className: "rounded-md p-1 hover:bg-muted",
									"aria-label": "Remove file",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-6 w-6 text-muted-foreground group-hover:text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-foreground",
									children: "Click to upload"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: " — PDF, up to 10 MB"
								})]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: inputRef,
								type: "file",
								accept: "application/pdf",
								className: "hidden",
								onChange: (e) => setFile(e.target.files?.[0] ?? null)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Job description (optional)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: jobDescription,
							onChange: (e) => setJobDescription(e.target.value),
							placeholder: "Paste the job description to tailor the analysis…",
							className: "min-h-[180px] rounded-xl bg-muted/30"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => mutation.mutate(),
							disabled: mutation.isPending || !file,
							className: "rounded-xl bg-gradient-brand text-white shadow-glow gap-2",
							children: mutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Analyzing…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "h-4 w-4" }), " Analyze Resume"] })
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-3",
				children: [
					!result && !mutation.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {}),
					mutation.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, {}),
					result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Results, {
						result,
						jobDescription
					})
				]
			})]
		})
	});
}
function EmptyState() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "rounded-2xl border-border/60 shadow-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex min-h-[400px] flex-col items-center justify-center text-center text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mb-3 h-10 w-10 text-primary/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: "Upload a resume to see your AI analysis here."
			})]
		})
	});
}
function LoadingState() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "rounded-2xl border-border/60 shadow-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex min-h-[400px] flex-col items-center justify-center gap-3 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: "Extracting text and generating insights..."
			})]
		})
	});
}
function Results({ result, jobDescription }) {
	const [emails, setEmails] = (0, import_react.useState)(null);
	const genFn = useServerFn(generateRecruiterEmail);
	const emailMutation = useMutation({
		mutationFn: () => genFn({ data: {
			jobDescription,
			summary: result.summary,
			strengths: result.strengths,
			importantKeywords: result.important_keywords
		} }),
		onSuccess: (data) => {
			setEmails(data);
			toast.success("Recruiter emails generated");
		},
		onError: (err) => toast.error(err.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreCard, {
					label: "Match Score",
					value: result.match_score
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreCard, {
					label: "ATS Score",
					value: result.ats_score
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, { summary: result.summary }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListCard, {
					icon: CircleCheck,
					tone: "text-emerald-500",
					title: "Strengths",
					items: result.strengths
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListCard, {
					icon: TriangleAlert,
					tone: "text-amber-500",
					title: "Weaknesses",
					items: result.weaknesses
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListCard, {
				icon: Lightbulb,
				tone: "text-primary",
				title: "Resume Improvements",
				items: result.resume_improvements
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCard, {
					icon: Target,
					title: "Missing Skills",
					items: result.missing_skills
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCard, {
					icon: KeyRound,
					title: "Important Keywords",
					items: result.important_keywords
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "rounded-2xl border-border/60 shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl bg-gradient-brand/10 p-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold",
							children: "Recruiter Email Generator"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Draft a tailored application email + 7-day follow-up using this analysis."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => emailMutation.mutate(),
						disabled: emailMutation.isPending,
						className: "rounded-xl bg-gradient-brand text-white shadow-glow gap-2",
						children: emailMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Generating…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }), " Generate Recruiter Email"] })
					})]
				})
			}),
			emails && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailCard, {
						icon: FileText,
						title: "Subject Line",
						content: emails.subject,
						mono: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailCard, {
						icon: Send,
						title: "Application Email",
						content: emails.application_email
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailCard, {
						icon: Clock,
						title: "Follow-up Email (Day 7)",
						content: emails.follow_up_email
					})
				]
			})
		]
	});
}
function EmailCard({ icon: Icon, title, content, mono }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(content);
			setCopied(true);
			toast.success(`${title} copied`);
			setTimeout(() => setCopied(false), 1800);
		} catch {
			toast.error("Copy failed");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "rounded-2xl border-border/60 shadow-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm font-semibold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-primary" }),
						" ",
						title
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					onClick: copy,
					className: "rounded-lg gap-1.5",
					children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), " Copied"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }), " Copy"] })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: `whitespace-pre-wrap break-words rounded-xl bg-muted/40 p-4 text-sm text-foreground/90 ${mono ? "font-mono" : "font-sans leading-relaxed"}`,
				children: content
			})]
		})
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
					children: value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value,
					className: "mt-3 h-2"
				})
			]
		})
	});
}
function SummaryCard({ summary }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "rounded-2xl border-border/60 shadow-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center gap-2 text-sm font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" }), " AI Summary"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted-foreground",
				children: summary
			})]
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
//#endregion
export { AiAnalysisPage as component };
