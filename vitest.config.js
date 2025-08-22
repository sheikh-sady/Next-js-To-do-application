import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8", // Use V8 instead of c8 for better JSX support
      reporter: ["text", "lcov", "html"], // Shows report in terminal + generates HTML
      all: true, // Include untested files
      include: ["src/**/*.{js,jsx,ts,tsx}", "app/**/*.{js,jsx,ts,tsx}"],
    },
    browser: {
      // array of browser instances
      instances: [
        {
          browser: "chromium", // <-- this is now required
        },
      ],
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },

    setupFiles: "./vitest.setup.js",
  },
});
