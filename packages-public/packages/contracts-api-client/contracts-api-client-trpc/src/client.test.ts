import { createClient } from "./client.js";
import type { AppClient } from "./client.js";

describe("trpc client", () => {

    let client: AppClient;

    before(() => {
        client = createClient("");

    })

    it("/users/me", () => {
        const me = client.users.me.query({})
    })

    it("/<networkId>/interfaces/IERC20/read/balanceOf", async () => {
        const balance = await client.interfaces.IERC20.balanceOf.mutate({ networkId: "1", address: "", contractParams: { account: "" } })
    })

    it("/<networkId>/deploy/ERC20Mintable", async () => {
        const erc20Mintable = await client.deploy.ERC20Mintable.mutate({
            networkId: "1",
            contractParams: {
                name: "",
                symbol: ""
            }
        })
    })
})
