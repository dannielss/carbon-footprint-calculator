import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "json"],
      include: ["src/"],
      exclude: [
        "node_modules/",
        "dist/",
        "tests/",
        "src/components/ui",
        "src/main.tsx",
      ],
    },
  },
});
