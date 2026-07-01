import { i as __toESM } from "../_runtime.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-CwjOB3K7.mjs";
import { z as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.callback-BS-l6b6x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthCallback() {
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const go = async () => {
			const { data } = await supabase.auth.getSession();
			if (cancelled) return;
			if (data.session) {
				navigate({
					to: "/dashboard",
					replace: true
				});
				return;
			}
			const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
				if (session || event === "SIGNED_IN") {
					sub.subscription.unsubscribe();
					navigate({
						to: "/dashboard",
						replace: true
					});
				}
			});
			setTimeout(() => {
				if (cancelled) return;
				sub.subscription.unsubscribe();
				supabase.auth.getSession().then(({ data: d }) => {
					navigate({
						to: d.session ? "/dashboard" : "/auth",
						replace: true
					});
				});
			}, 5e3);
		};
		go();
		return () => {
			cancelled = true;
		};
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: "Signing you in…"
			})]
		})
	});
}
//#endregion
export { AuthCallback as component };
