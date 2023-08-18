// import path from "path";
import { defineConfig } from "vitest/config";
import { config } from "dotenv";

config();

export default defineConfig({
  test: {
    include: ["**/*.test.ts"],
    testTimeout: 30 * 1000, // 30s
    // reporters: "verbose",
    // setupFiles: ["./src/libs/globals.vitest.ts"],
  },
  // resolve: {
  //   alias: {
  //     "@app": path.resolve(__dirname, "./app"),
  //   },
  // },
});
