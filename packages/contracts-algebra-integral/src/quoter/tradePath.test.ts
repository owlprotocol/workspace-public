import { describe, test, expect } from "vitest";
import { parseEther } from "viem";
import { decodeTradePath, encodeTradePath, getTradePaths } from "./tradePath.js";

describe("quoteExact.test.ts", function () {
    const ONE = "0x0000000000000000000000000000000000000001";
    const TWO = "0x0000000000000000000000000000000000000002";
    const THREE = "0x0000000000000000000000000000000000000003";

    const ONE_TWO = "0x00000000000000000000000000000000000000010000000000000000000000000000000000000002";
    const ONE_TWO_THREE =
        "0x000000000000000000000000000000000000000100000000000000000000000000000000000000020000000000000000000000000000000000000003";

    //TODO: Maybe this needs sorting???
    test("encodeTradePath", async () => {
        expect(encodeTradePath([ONE, TWO])).toBe(ONE_TWO);
        expect(encodeTradePath([ONE, TWO, THREE])).toBe(ONE_TWO_THREE);
    });

    test("decodeTradePath", async () => {
        expect(decodeTradePath(ONE_TWO)).toStrictEqual([ONE, TWO]);
        expect(decodeTradePath(ONE_TWO_THREE)).toStrictEqual([ONE, TWO, THREE]);
    });

    test("getTradePaths", () => {
        const paths = getTradePaths({ inputAddress: ONE, outputAddress: TWO, intermediateAddresses: [THREE] });
        expect(paths.length).toBe(2);
        expect(paths[0]).toStrictEqual([ONE, TWO]);
        expect(paths[1]).toStrictEqual([ONE, THREE, TWO]);
    });
});
