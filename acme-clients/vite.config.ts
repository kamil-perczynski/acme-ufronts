import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginSingleSpa from "vite-plugin-single-spa";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/ufronts/acme-clients",
  plugins: [
    react(),
    vitePluginSingleSpa({
      type: "mife",
      serverPort: 4201,
      cssStrategy: "singleMife",
      spaEntryPoints: "src/spa.tsx",
    }),
  ],
  build: {
    sourcemap: process.env.GENERATE_SOURCEMAP !== "false",
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
  server: {
    hmr: false,
  },
});
