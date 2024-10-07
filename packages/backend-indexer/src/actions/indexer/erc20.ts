import { Address } from "abitype";
import { Chain, Client, Transport } from "viem";
import { balanceOf, allowance } from "@owlprotocol/contracts-diamond/artifacts/IERC20";
import { ERC20Allowance, ERC20Balance } from "@owlprotocol/eth-firebase/models";
import { erc20AllowanceResource, erc20BalanceResource } from "@owlprotocol/eth-firebase/admin";
import { getAction } from "viem/utils";
import { getChainId, readContract } from "viem/actions";

/**
 * Update ERC20Balance if no cached data or stale
 * @param erc20Balance to update (with blockNumber to compare)
 * @param clients publicClient, erc20BalanceResource
 * @returns
 */
export async function getERC20Balance<chain extends Chain | undefined>(
    client: Client<Transport, chain>,
    params: {
        address: Address;
        account: Address;
        blockNumber: bigint;
    },
): Promise<ERC20Balance> {
    const { address, account, blockNumber } = params;

    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));

    const balance = await erc20BalanceResource.getOrNull({ chainId, address, account });
    if (!balance || balance.blockNumber < blockNumber) {
        //No data or stale data
        const balanceRpc = await readContract(client, {
            address,
            abi: [balanceOf],
            functionName: "balanceOf",
            args: [account],
        });
        const balanceUpdated = { chainId, address, account, blockNumber, balance: balanceRpc };
        await erc20BalanceResource.upsert(balanceUpdated);
        return balanceUpdated;
    } else {
        return balance;
    }
}

/**
 * Update ERC20Allowance if no cached data or stale
 * @param erc20Allowance to update (with blockNumber to compare)
 * @param clients publicClient, erc20AllowanceResource
 * @returns
 */
export async function getERC20Allowance<chain extends Chain | undefined>(
    client: Client<Transport, chain>,
    params: {
        address: Address;
        account: Address;
        spender: Address;
        blockNumber: bigint;
    },
): Promise<ERC20Allowance> {
    const { address, account, spender, blockNumber } = params;

    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));

    const balance = await erc20AllowanceResource.getOrNull({ chainId, address, account, spender });
    if (!balance || balance.blockNumber < blockNumber) {
        //No data or stale data
        const balanceRpc = await readContract(client, {
            address,
            abi: [allowance],
            functionName: "allowance",
            args: [account, spender],
        });
        const allowanceUpdated = { chainId, address, account, spender, blockNumber, balance: balanceRpc };
        await erc20AllowanceResource.upsert(allowanceUpdated);
        return allowanceUpdated;
    } else {
        return balance;
    }
}
