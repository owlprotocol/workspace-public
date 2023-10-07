import dotenv from "dotenv";
import findConfig from "find-config";

export const NODE_ENV = process.env.NODE_ENV ?? "development";
export const DOTENV_KEY = process.env.DOTENV_KEY;

export const isClient = () => typeof window !== "undefined";

export function dotenvConfig(nodeEnv = NODE_ENV, dotenvKey = DOTENV_KEY) {
    //Only works in Node Environment
    if (!isClient()) {
        if (dotenvKey) {
            //Load remote envvars
            dotenv.config({ DOTENV_KEY: dotenvKey });
        } else if (nodeEnv === "development") {
            dotenv.config({ path: findConfig(".env") ?? undefined });
        } else if (nodeEnv === "test") {
            dotenv.config({ path: findConfig(".env") ?? undefined });
        } else if (nodeEnv === "ci") {
            dotenv.config({ path: findConfig(".env.ci") ?? undefined });
        } else if (nodeEnv === "staging") {
            dotenv.config({ path: findConfig(".env.staging") ?? undefined });
        } else if (nodeEnv === "production") {
            dotenv.config({ path: findConfig(".env.production") ?? undefined });
        }
    }
}
