import { describe, test, expect } from "vitest";
import { isUUID } from "./uuid.js";

describe("uuid.test.ts", function () {
    test("is uuid", async () => {
        const uuid = "a24a6ea4-ce75-4665-a070-57453082c256";
        expect(isUUID(uuid)).toBe(true);

        const notUUID = "not-a-uuid";
        expect(isUUID(notUUID)).toBe(false);
    });
});
