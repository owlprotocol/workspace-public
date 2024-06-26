/// <reference types="vitest" />
import { defineConfig } from "vite";

// eslint-disable-next-line import/no-default-export
export default defineConfig({
    plugins: [],
    test: {
        //environment: "node",
        globals: false,
        globalSetup: "vitest.setup.ts",
        testTimeout: 60000,
        watch: true,
        include: ["src/**/*.test.ts"],
        poolOptions: {
            threads: {
                singleThread: true,
            },
        },
        //setupFiles: "./src/test/setup.ts",
    },
});
