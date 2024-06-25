import dotenv from "dotenv";
import findConfig from "find-config";

export const NODE_ENV = process.env.NODE_ENV ?? "development";
export const DOTENV_KEY = process.env.DOTENV_KEY;

export const isClient = () => typeof window !== "undefined";

export function dotenvConfig(nodeEnv = NODE_ENV, dotenvKey = DOTENV_KEY) {
    //Only works in Node Environment
    if (!isClient()) {
        if (dotenvKey) {
            console.debug("Loading .env.vault ");
            //Load remote envvars
            dotenv.config({ path: findConfig(".env.vault") ?? undefined, DOTENV_KEY: dotenvKey });
        } else if (nodeEnv === "development") {
            console.debug("Loading .env");
            dotenv.config({ path: findConfig(".env") ?? undefined });
        } else if (nodeEnv === "test") {
            console.debug("Loading .env");
            dotenv.config({ path: findConfig(".env") ?? undefined });
        } else if (nodeEnv === "ci") {
            console.debug("Loading .env.ci");
            dotenv.config({ path: findConfig(".env.ci") ?? undefined });
        } else if (nodeEnv === "staging") {
            dotenv.config({ path: findConfig(".env.staging") ?? undefined });
            console.debug("Loading .env.staging");
        } else if (nodeEnv === "production") {
            console.debug("Loading .env.production");
            dotenv.config({ path: findConfig(".env.production") ?? undefined });
        }
    }
}
