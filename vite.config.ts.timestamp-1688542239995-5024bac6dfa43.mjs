// vite.config.ts
import { defineConfig } from "file:///C:/Users/Admin/charmbuilder/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import preact from "file:///C:/Users/Admin/charmbuilder/node_modules/@preact/preset-vite/dist/esm/index.mjs";
import cssInjectedByJsPlugin from "file:///C:/Users/Admin/charmbuilder/node_modules/vite-plugin-css-injected-by-js/dist/esm/index.js";
var __vite_injected_original_dirname = "C:\\Users\\Admin\\charmbuilder";
var vite_config_default = defineConfig({
  plugins: [preact(), cssInjectedByJsPlugin()],
  build: {
    modulePreload: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__vite_injected_original_dirname, "src/main.tsx"),
      name: "f22",
      formats: ["iife"],
      // the proper extensions will be added
      fileName: "f22"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pblxcXFxjaGFybWJ1aWxkZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEFkbWluXFxcXGNoYXJtYnVpbGRlclxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvQWRtaW4vY2hhcm1idWlsZGVyL3ZpdGUuY29uZmlnLnRzXCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgcHJlYWN0IGZyb20gXCJAcHJlYWN0L3ByZXNldC12aXRlXCI7XHJcbmltcG9ydCBjc3NJbmplY3RlZEJ5SnNQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLWNzcy1pbmplY3RlZC1ieS1qc1wiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcHJlYWN0KCksIGNzc0luamVjdGVkQnlKc1BsdWdpbigpXSxcclxuICBcclxuICBidWlsZDoge1xyXG4gICAgbW9kdWxlUHJlbG9hZDogZmFsc2UsXHJcbiAgICBsaWI6IHtcclxuICAgICAgLy8gQ291bGQgYWxzbyBiZSBhIGRpY3Rpb25hcnkgb3IgYXJyYXkgb2YgbXVsdGlwbGUgZW50cnkgcG9pbnRzXHJcbiAgICAgIGVudHJ5OiByZXNvbHZlKCAgX19kaXJuYW1lICAgLCBcInNyYy9tYWluLnRzeFwiKSxcclxuICAgICAgbmFtZTogXCJmMjJcIixcclxuICAgICAgZm9ybWF0czogW1wiaWlmZVwiXSxcclxuICAgICAgLy8gdGhlIHByb3BlciBleHRlbnNpb25zIHdpbGwgYmUgYWRkZWRcclxuICAgICAgZmlsZU5hbWU6IFwiZjIyXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixTQUFTLGVBQWU7QUFDeEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sMkJBQTJCO0FBSmxDLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7QUFBQSxFQUUzQyxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsSUFDZixLQUFLO0FBQUE7QUFBQSxNQUVILE9BQU8sUUFBVSxrQ0FBYyxjQUFjO0FBQUEsTUFDN0MsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLE1BQU07QUFBQTtBQUFBLE1BRWhCLFVBQVU7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
