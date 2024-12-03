import { Address } from "abitype";
import { Chain, Client, decodeEventLog, Transport } from "viem";
import { getAction } from "viem/utils";
import { getChainId, readContract } from "viem/actions";
import { balanceOf } from "@owlprotocol/contracts-diamond/artifacts/IERC1155";
import { ERC1155Balance } from "@owlprotocol/eth-firebase/models";
import { erc1155BalanceResource } from "@owlprotocol/eth-firebase/admin";
import { TransferBatch, TransferSingle } from "@owlprotocol/contracts-diamond/artifacts/IERC1155";
import { getLogs } from "./getLogs.js";

type BalanceInputs = { address: Address; account: Address; blockNumber: bigint };

/**
 * Gets all ERCC1155Balances for an address and / or account,
 * and updates ERC1155Balance if no cached data or stale
 * @param clients publicClient
 * @param address ERC1155 address
 * @param account owner address
 * @returns
 */
export async function getERC1155Tokens<chain extends Chain | undefined>(
    client: Client<Transport, chain>,
    params: {
        address?: Address;
        account?: Address;
    },
) {
    const { address, account } = params;
    if (!address && !account) {
        throw new Error("One of address or account must be specified");
    }

    // const getLogsAction = getAction(client, getLogs, "getLogs");

    const logsBatchPromise = getLogs(client, {
        address,
        event: TransferBatch,
        args: { to: account },
        strict: true,
    });
    const logsSinglePromise = getLogs(client, {
        address,
        event: TransferSingle,
        args: { to: account },
        strict: true,
        fromBlock: 0n,
    });

    const [logsBatch, logsSingle] = await Promise.all([logsBatchPromise, logsSinglePromise]);

    const idsToBalanceInputs = new Map<bigint, BalanceInputs>();
    const setIdIfBlockNumberGreater = (id: bigint, balanceInputs: BalanceInputs) => {
        const idItem = idsToBalanceInputs.get(id);
        if (!idItem || idItem.blockNumber < balanceInputs.blockNumber) {
            idsToBalanceInputs.set(id, balanceInputs);
        }
    };

    logsSingle.forEach((log) => {
        const decoded = decodeEventLog({ abi: [TransferSingle], ...log });
        const { address, blockNumber } = log;
        const { id, to } = decoded.args;

        setIdIfBlockNumberGreater(id, { address, account: to, blockNumber });
    });

    logsBatch.forEach((log) => {
        const decoded = decodeEventLog({ abi: [TransferBatch], ...log });
        const { address, blockNumber } = log;
        const { ids, to } = decoded.args;
        ids.forEach((id) => setIdIfBlockNumberGreater(id, { address, account: to, blockNumber }));
    });

    const balancesPromises: Promise<ERC1155Balance>[] = [];
    idsToBalanceInputs.forEach((value, id) => balancesPromises.push(getERC1155Balance(client, { id, ...value })));

    return Promise.all(balancesPromises);
}

/**
 * Update ERC1155Balance if no cached data or stale
 * @param erc1155Balance to update (with blockNumber to compare)
 * @param clients publicClient, erc1155BalanceResource
 * @returns
 */
export async function getERC1155Balance<chain extends Chain | undefined>(
    client: Client<Transport, chain>,
    params: {
        address: Address;
        account: Address;
        id: bigint;
        blockNumber: bigint;
    },
): Promise<ERC1155Balance> {
    const { address, account, id, blockNumber } = params;

    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));

    //TODO: Warning MUST be `id` should ALWAYS be used as decimal string
    const balance = await erc1155BalanceResource.getOrNull({ chainId, address, account, id: id.toString(10) });
    if (!balance || balance.blockNumber < blockNumber) {
        //No data or stale data
        const balanceRpc = await readContract(client, {
            address,
            abi: [balanceOf],
            functionName: "balanceOf",
            args: [account, id],
        });
        const balanceUpdated = { chainId, address, account, id: id.toString(10), blockNumber, balance: balanceRpc };
        await erc1155BalanceResource.upsert(balanceUpdated);
        return balanceUpdated;
    } else {
        return balance;
    }
}
