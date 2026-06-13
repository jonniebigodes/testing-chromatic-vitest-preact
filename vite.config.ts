/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { chromaticPlugin } from "@chromatic-com/vitest/plugin";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    preact({
      babel: {
        plugins: ["babel-plugin-styled-components"],
      },
    }),
  ],
  resolve: {
    dedupe: ["preact"],
  },
  optimizeDeps: {
    include: ["preact/hooks"],
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
        },
      },
      {
        resolve: {
          alias: {
            react: "preact/compat",
            "react-dom": "preact/compat",
            "react/jsx-runtime": "preact/jsx-runtime",
            "react/jsx-dev-runtime": "preact/jsx-dev-runtime",
          },
        },
        plugins: [
          chromaticPlugin({
            disableAutoSnapshot: true,
            reporter: {
              enabled: true,
              verbose: true,
            },
          }),
        ],
        test: {
          name: "chromatic",
          include: ["src/components/**/*.test.tsx", "src/pages/**/*.test.tsx"],
          setupFiles: ["./src/test-setup.tsx"],
          browser: {
            enabled: true,
            headless: true,
            screenshotFailures: false,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
              {
                browser: "firefox",
              },

              {
                browser: "webkit",
              },
            ],
          },
        },
      },
    ],
  },
});
