import { expect, describe, beforeAll, test } from "vitest";
import { createClient } from "./client.js";
import type { AppClient } from "./client.js";

describe("trpc client", () => {
    let client: AppClient;

    beforeAll(() => {
        client = createClient("");
    });

    test("/users/me", () => {
        const me = client.users.me.query();
        expect(me).toBeDefined();
    });

    test("/<networkId>/interfaces/IERC20/read/balanceOf", async () => {
        const balance = await client.interfaces.IERC20.balanceOf.mutate({
            networkId: "1",
            address: "",
            contractParams: { account: "" },
        });
        expect(balance).toBeDefined();
    });

    test("/<networkId>/deploy/ERC20Mintable", async () => {
        const erc20Mintable = await client.deploy.ERC20Mintable.mutate({
            networkId: "1",
            contractParams: {
                name: "",
                symbol: "",
            },
        });
        expect(erc20Mintable).toBeDefined();
    });
});
