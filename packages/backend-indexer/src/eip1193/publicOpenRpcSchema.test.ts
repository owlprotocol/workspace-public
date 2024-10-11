import { expect, describe, test, beforeAll } from "vitest";
import { MethodCallValidator, ParameterValidationError } from "@open-rpc/schema-utils-js";
import { getPublicOpenRpcSchema } from "./publicOpenRpcSchema.js";

describe("publicOpenRpcSchema.test.ts", function () {
    let publicRpcValidator: MethodCallValidator;

    beforeAll(async () => {
        publicRpcValidator = (await getPublicOpenRpcSchema()).publicRpcValidator;
    });

    test("eth_getBlockByNumber", () => {
        const errors = publicRpcValidator.validate("eth_getBlockByNumber", ["0x1", true]);
        expect(errors).toStrictEqual([]);
    });

    test("eth_getBlockByNumber", () => {
        const errors = publicRpcValidator.validate("eth_getBlockByNumber", []) as ParameterValidationError[];
        expect(errors.length).toBeGreaterThan(0);
    });

    test("eth_getBlockByNumber", () => {
        const errors = publicRpcValidator.validate("eth_getBlockByNumber", ["1", true]) as ParameterValidationError[];
        expect(errors.length).toBeGreaterThan(0);
    });

    test("eth_getBlockByHash", () => {
        const errors = publicRpcValidator.validate("eth_getBlockByHash", ["0x1", true]) as ParameterValidationError[];
        expect(errors.length).toBeGreaterThan(0);
    });
});
