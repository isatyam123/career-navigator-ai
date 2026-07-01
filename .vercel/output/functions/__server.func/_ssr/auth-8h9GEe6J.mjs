import { i as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-CwjOB3K7.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as CardContent, t as Card } from "./card-Bmhn9hYF.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { P as ArrowLeft, x as GraduationCap, z as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-8h9GEe6J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate({ to: "/dashboard" });
		});
	}, [navigate]);
	const handleGoogle = async () => {
		setLoading(true);
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: `${window.location.origin}/auth/callback` }
		});
		if (error) {
			toast.error(error.message || "Sign in failed. Please try again.");
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0 -z-10 opacity-60",
				style: { background: "radial-gradient(50% 50% at 50% 30%, oklch(0.55 0.22 285 / 0.3) 0%, transparent 70%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "absolute left-6 top-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "w-full max-w-md rounded-2xl border-border/60 shadow-glow",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col items-center gap-6 p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand shadow-glow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-7 w-7 text-white" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-semibold tracking-tight",
								children: "Welcome to Career Navigator AI"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Sign in to track applications and let AI supercharge your job search."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: handleGoogle,
							disabled: loading,
							size: "lg",
							variant: "outline",
							className: "w-full gap-3 rounded-xl border-border/60 bg-background text-foreground hover:bg-muted/50",
							children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, {}), "Continue with Google"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-xs text-muted-foreground",
							children: "By continuing you agree to our Terms and Privacy Policy."
						})
					]
				})
			})
		]
	});
}
function GoogleIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4285F4",
				d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#34A853",
				d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FBBC05",
				d: "M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#EA4335",
				d: "M12 5.38c1.62 0 3.06.56 4.2 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
			})
		]
	});
}
//#endregion
export { AuthPage as component };
