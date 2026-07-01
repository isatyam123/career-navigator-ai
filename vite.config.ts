import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tanstackStart({
      server: {
        entry: "server",
      },
    }),
    nitro({
      preset: process.env.VERCEL ? "vercel" : "node-server",
      noExternals: process.env.VERCEL ? true : false,
    }),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],
  resolve: {
    alias: {
      tslib: "tslib/tslib.es6.mjs",
    },
  },
  ssr: {
    noExternal: ["tslib"],
  },
});
