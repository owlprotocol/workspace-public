import { describe, test, expect, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react-hooks/native";
import { usersHooks } from "./crud.js";
import { usersCRUD } from "../web/crud.js";
import { testUser, testUserId } from "../test/data.js";

describe("user.test.ts", () => {
    beforeEach(async () => {
        await usersCRUD.deleteAll();

        const users = await usersCRUD.getAll();
        console.debug(users);
    });

    test("useGet - undefined id", async () => {
        await usersCRUD.set(testUser);
        const { result } = renderHook(() => usersHooks.useGet(undefined));

        const [result0, options0] = result.current;
        expect(result0).toStrictEqual(undefined);
        expect(options0.status).toBe("loading");
    });

    test("useGet", async () => {
        await usersCRUD.set(testUser);
        const { result, waitForNextUpdate } = renderHook(() => usersHooks.useGet(testUserId));

        const [result0, options0] = result.current;
        expect(result0).toStrictEqual(undefined);
        expect(options0.status).toBe("loading");

        await waitForNextUpdate();

        const [result1, options1] = result.current;
        expect(result1).toStrictEqual(testUser);
        expect(options1.status).toBe("success");

        //Test data sync, updating user updates hook
        const testUserUpdated = { ...testUser, email: "jane.doe@gmail.com" };
        await usersCRUD.update(testUserUpdated);

        await waitForNextUpdate();

        const [result2, options2] = result.current;
        expect(result2).toStrictEqual(testUserUpdated);
        expect(options2.status).toBe("success");
    });

    test("useGetAll", async () => {
        await usersCRUD.set(testUser);
        const { result, waitForNextUpdate } = renderHook(() => usersHooks.useGetAll());

        const [result0, options0] = result.current;
        expect(result0).toStrictEqual(undefined);
        expect(options0.status).toBe("loading");

        await waitForNextUpdate();

        const [result1, options1] = result.current;
        expect(result1).toStrictEqual([testUser]);
        expect(options1.status).toBe("success");
    });

    test("useGetWhere", async () => {
        await usersCRUD.set(testUser);
        const { result, waitForNextUpdate } = renderHook(() => usersHooks.useGetWhere({ email: testUser.email }));

        const [result0, options0] = result.current;
        expect(result0).toStrictEqual(undefined);
        expect(options0.status).toBe("loading");

        await waitForNextUpdate();

        const [result1, options1] = result.current;
        expect(result1).toStrictEqual([testUser]);
        expect(options1.status).toBe("success");
    });
});
