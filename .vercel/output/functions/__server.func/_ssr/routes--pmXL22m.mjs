import { i as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-CwjOB3K7.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as CardContent, t as Card } from "./card-Bmhn9hYF.mjs";
import { C as FileText, H as CircleCheck, L as Sparkles, N as ArrowRight, j as Briefcase, p as MessageSquare, x as GraduationCap } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes--pmXL22m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_orb_default = "/assets/hero-orb-D7PWyN_d.jpg";
function Landing() {
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate({ to: "/dashboard" });
		});
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand shadow-glow",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-5 w-5 text-white" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold tracking-tight",
								children: "Career Navigator AI"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden gap-8 text-sm text-muted-foreground md:flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#features",
									className: "hover:text-foreground",
									children: "Features"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#how",
									className: "hover:text-foreground",
									children: "How it works"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#pricing",
									className: "hover:text-foreground",
									children: "Pricing"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "rounded-xl bg-gradient-brand text-white shadow-glow hover:opacity-95",
								children: "Sign in"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "pointer-events-none absolute inset-0 -z-10 opacity-60",
					style: { background: "radial-gradient(60% 50% at 50% 0%, oklch(0.55 0.22 285 / 0.35) 0%, transparent 70%)" }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-2 md:py-28",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-center gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), "AI-powered career OS for students"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "text-4xl font-semibold tracking-tight md:text-6xl",
								children: [
									"Land your dream role with a",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gradient-brand",
										children: "personal AI recruiter"
									}),
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-lg text-base text-muted-foreground md:text-lg",
								children: "Track every application, tailor your resume with AI, prep for interviews, and never miss a deadline — all in one beautiful workspace."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/auth",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "lg",
										className: "gap-2 rounded-xl bg-gradient-brand text-white shadow-glow hover:opacity-95",
										children: ["Get started free ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#features",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "lg",
										variant: "outline",
										className: "rounded-xl",
										children: "See features"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-4 pt-2 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-500" }), " No credit card"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-500" }), " Free for students"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-500" }), " Sign in with Google"]
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-6 rounded-3xl bg-gradient-brand opacity-20 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: hero_orb_default,
							alt: "Glowing purple orb representing Career Navigator AI",
							width: 1280,
							height: 1280,
							className: "relative aspect-square w-full rounded-3xl border border-border/60 object-cover shadow-glow"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "features",
				className: "mx-auto max-w-6xl px-4 py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-12 max-w-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-semibold uppercase tracking-widest text-primary",
						children: "Features"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-3xl font-semibold tracking-tight md:text-4xl",
						children: "Everything you need to run your job search"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
					children: [
						{
							icon: Briefcase,
							title: "Application tracker",
							desc: "Kanban-style pipeline with status, deadlines and notes."
						},
						{
							icon: FileText,
							title: "Smart resume",
							desc: "AI tailors each resume to the job in seconds."
						},
						{
							icon: Sparkles,
							title: "AI analysis",
							desc: "Match score, ATS score, and skill gap insights."
						},
						{
							icon: MessageSquare,
							title: "Interview prep",
							desc: "Practice decks generated for every role."
						}
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "rounded-2xl border-border/60 shadow-card transition hover:-translate-y-0.5 hover:shadow-glow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "flex flex-col gap-3 p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-semibold",
									children: f.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: f.desc
								})
							]
						})
					}, f.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "how",
				className: "mx-auto max-w-6xl px-4 pb-20 scroll-mt-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-12 max-w-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-semibold uppercase tracking-widest text-primary",
						children: "How it works"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-3xl font-semibold tracking-tight md:text-4xl",
						children: "Go from resume to offer in three steps"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-3",
					children: [
						{
							n: "01",
							title: "Upload your resume",
							desc: "Drop your PDF — we extract and store it securely."
						},
						{
							n: "02",
							title: "Analyze against a role",
							desc: "AI analyzes fit, ATS, and gaps in seconds."
						},
						{
							n: "03",
							title: "Track & follow up",
							desc: "Save applications, generate emails, prep interviews."
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "rounded-2xl border-border/60 shadow-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "flex flex-col gap-3 p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-semibold tracking-widest text-primary",
									children: s.n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-semibold",
									children: s.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: s.desc
								})
							]
						})
					}, s.n))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "pricing",
				className: "mx-auto max-w-6xl px-4 pb-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-brand p-10 text-center shadow-glow md:p-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 -z-10 opacity-30",
							style: { background: "radial-gradient(50% 60% at 50% 50%, white 0%, transparent 70%)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl font-semibold tracking-tight text-white md:text-4xl",
							children: "Ready to land your next offer?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-3 max-w-xl text-sm text-white/80 md:text-base",
							children: "Join thousands of students turning applications into offers with Career Navigator AI."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "lg",
									className: "rounded-xl bg-white text-primary hover:bg-white/90",
									children: "Start free with Google"
								})
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border/40 py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between px-4 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© 2026 Career Navigator AI" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Made for students, by students." })]
				})
			})
		]
	});
}
//#endregion
export { Landing as component };
