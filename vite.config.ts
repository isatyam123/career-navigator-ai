// @lovable.dev/vite-tanstack-config already includes tanstackStart, viteReact,
// tailwindcss, tsConfigPaths, nitro, dedupe, error plugins, and sandbox detection.
// We override the nitro preset here so the app builds for Vercel as well as the
// default Cloudflare target. Nitro auto-detects VERCEL / CF envs, but pinning
// preset when NITRO_PRESET is set keeps builds deterministic.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const preset = process.env.NITRO_PRESET;

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  ...(preset ? { nitro: { preset } } : process.env.VERCEL ? { nitro: { preset: "vercel" } } : {}),
});
