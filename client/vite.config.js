import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import brotli from 'rollup-plugin-brotli';

installGlobals();

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ['**/*.css'],
    }),
    tsconfigPaths(),
  ],
  ssr: {
    noExternal: ['primereact'],
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "./src/styles/variables.css";`,
      },
    },
  },
  build: {
    rollupOptions: {
      plugins: [brotli()],
    },
  },
});

// import { vitePlugin as remix } from "@remix-run/dev";
// import { defineConfig } from "vite";
// import tsconfigPaths from "vite-tsconfig-paths";

// export default defineConfig({
//   plugins: [
//     remix({
//       ignoredRouteFiles: ["**/*.css"],
//     }),
//     tsconfigPaths(),
//   ],
// });
