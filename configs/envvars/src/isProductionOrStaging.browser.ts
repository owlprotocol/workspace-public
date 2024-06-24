import { NODE_ENV } from "./envvars.browser.js";

export function isProduction(env = NODE_ENV): env is "production" {
    return env === "production";
}

export function isStaging(env = NODE_ENV): env is "staging" {
    return env === "staging";
}

export function isDevelopment(env = NODE_ENV): env is "development" {
    return env === "development";
}

export function isTest(env = NODE_ENV): env is "test" {
    return env === "test";
}

export function isProductionOrStaging(env = NODE_ENV): env is "production" | "staging" {
    return isProduction(env) || isStaging(env);
}
