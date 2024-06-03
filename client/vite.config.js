import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";

installGlobals();

export default defineConfig({
  plugins: [remix()],
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "./src/styles/variables.css";`,
      },
    },
  },
});
