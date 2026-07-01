import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as cn, t as Button } from "./button-BpE9Czok.mjs";
import { n as CardContent, t as Card } from "./card-Bmhn9hYF.mjs";
import { t as PagePlaceholder } from "./PagePlaceholder-BXXXz2LN.mjs";
import { s as Settings } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { t as Label } from "./label-AutfcB-T.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CL0ImZNw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePlaceholder, {
	title: "Settings",
	description: "Manage your profile and preferences.",
	icon: Settings,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-1 gap-6 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "rounded-2xl border-border/60 shadow-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-4 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: "Profile"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Full name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Enter your name",
									className: "rounded-xl bg-muted/40"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Enter your email",
									className: "rounded-xl bg-muted/40"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "University / Company" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Enter your organization",
									className: "rounded-xl bg-muted/40"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-2 w-fit rounded-xl bg-gradient-brand text-white shadow-glow",
						children: "Save changes"
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "rounded-2xl border-border/60 shadow-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-4 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold",
					children: "Preferences"
				}), [
					{
						label: "Email deadline reminders",
						desc: "Get pinged 48h before a deadline"
					},
					{
						label: "Weekly AI digest",
						desc: "Sunday overview of your pipeline"
					},
					{
						label: "Interview practice nudges",
						desc: "Daily quick-prep reminders"
					},
					{
						label: "Public profile",
						desc: "Share progress with mentors"
					}
				].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-xl border border-border/60 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-medium",
						children: p.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: p.desc
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, { defaultChecked: true })]
				}, p.label))]
			})
		})]
	})
});
//#endregion
export { SplitComponent as component };
