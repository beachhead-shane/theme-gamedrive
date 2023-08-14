import { playwrightLauncher } from "@web/test-runner-playwright";
import { esbuildPlugin } from "@web/dev-server-esbuild";

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  testFramework: {
    config: {
      timeout: 10000,
    },
  },
  nodeResolve: true,
  files: ["./src/**/*.test.ts"],
  browsers: [playwrightLauncher({ product: "chromium" })],
  plugins: [
    esbuildPlugin({ ts: true, json: true, target: "auto", sourceMap: true }),
  ],
  // This is required to make tests with redux-toolkit work since it requires
  // window.process to be defined during testing.
  testRunnerHtml: (testFramework) =>
    `<html>
      <body>
        <script>window.process = { env: { NODE_ENV: "development" } }</script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`,
});
