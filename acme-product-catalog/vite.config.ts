import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginSingleSpa from "vite-plugin-single-spa";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/ufronts/@acme/acme-product-catalog",
  plugins: [
    react(),
    vitePluginSingleSpa({
      type: "mife",
      serverPort: 4101,
      cssStrategy: "singleMife",
      spaEntryPoints: "src/spa.tsx",
    }),
  ],
  build: {
    sourcemap: process.env.GENERATE_SOURCEMAP === "true",
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
  server: {
    hmr: false,
  },
});
