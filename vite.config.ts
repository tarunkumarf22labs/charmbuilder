
import { defineConfig } from "vite";
import { resolve } from "path";
import preact from "@preact/preset-vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), cssInjectedByJsPlugin()],
  
  build: {
    modulePreload: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(  __dirname   , "src/main.tsx"),
      name: "f22",
      formats: ["iife"],
      // the proper extensions will be added
      fileName: "f22",
    },
  },
});