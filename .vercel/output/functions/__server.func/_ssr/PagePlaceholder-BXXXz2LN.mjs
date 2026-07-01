import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as CardContent, t as Card } from "./card-Bmhn9hYF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PagePlaceholder-BXXXz2LN.js
var import_jsx_runtime = require_jsx_runtime();
function PagePlaceholder({ title, description, icon: Icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-7xl flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-semibold tracking-tight",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: description
			})] })]
		}), children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "rounded-2xl border-dashed border-border/70 bg-gradient-subtle shadow-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex min-h-[360px] flex-col items-center justify-center gap-2 p-10 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-lg font-medium",
					children: "Coming soon"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-md text-sm text-muted-foreground",
					children: "This section is part of the Career Navigator AI preview. Content will populate once your workspace is connected."
				})]
			})
		})]
	});
}
//#endregion
export { PagePlaceholder as t };
