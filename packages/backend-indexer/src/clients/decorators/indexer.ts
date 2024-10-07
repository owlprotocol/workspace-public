import type { AbiEvent } from "abitype";
import {
    Transport,
    Chain,
    Account,
    BlockNumber,
    BlockTag,
    Client,
    GetBlockParameters,
    GetBlockReturnType,
    GetBytecodeParameters,
    GetBytecodeReturnType,
    GetLogsParameters,
    GetLogsReturnType,
    GetTransactionParameters,
    GetTransactionReceiptParameters,
    GetTransactionReceiptReturnType,
    GetTransactionReturnType,
} from "viem";
import { getBlock } from "../../actions/public/getBlock.js";
import { getBytecode } from "../../actions/public/getBytecode.js";
import { getLogs } from "../../actions/public/getLogs.js";
import { getTransaction } from "../../actions/public/getTransaction.js";
import { getTransactionReceipt } from "../../actions/public/getTransactionReceipt.js";

export type IndexerActions<
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _transport extends Transport = Transport,
    chain extends Chain | undefined = Chain | undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _account extends Account | undefined = Account | undefined,
> = {
    /**
     * Returns information about a block at a block number, hash, or tag.
     *
     * - Docs: https://viem.sh/docs/actions/public/getBlock
     * - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks/fetching-blocks
     * - JSON-RPC Methods:
     *   - Calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber) for `blockNumber` & `blockTag`.
     *   - Calls [`eth_getBlockByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbyhash) for `blockHash`.
     *
     * @param args - {@link GetBlockParameters}
     * @returns Information about the block. {@link GetBlockReturnType}
     *
     * @example
     * import { createPublicClient, http } from 'viem'
     * import { mainnet } from 'viem/chains'
     *
     * const client = createPublicClient({
     *   chain: mainnet,
     *   transport: http(),
     * })
     * const block = await client.getBlock()
     */
    getBlock: <includeTransactions extends boolean = false, blockTag extends BlockTag = "latest">(
        args?: GetBlockParameters<includeTransactions, blockTag> | undefined,
    ) => Promise<GetBlockReturnType<chain, includeTransactions, blockTag>>;
    /** @deprecated Use `getCode` instead. */
    getBytecode: (args: GetBytecodeParameters) => Promise<GetBytecodeReturnType>;
    /**
     * Retrieves the bytecode at an address.
     *
     * - Docs: https://viem.sh/docs/contract/getCode
     * - JSON-RPC Methods: [`eth_getCode`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getcode)
     *
     * @param args - {@link GetBytecodeParameters}
     * @returns The contract's bytecode. {@link GetBytecodeReturnType}
     *
     * @example
     * import { createPublicClient, http } from 'viem'
     * import { mainnet } from 'viem/chains'
     *
     * const client = createPublicClient({
     *   chain: mainnet,
     *   transport: http(),
     * })
     * const code = await client.getCode({
     *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
     * })
     */
    getCode: (args: GetBytecodeParameters) => Promise<GetBytecodeReturnType>;
    /**
     * Returns a list of event logs matching the provided parameters.
     *
     * - Docs: https://viem.sh/docs/actions/public/getLogs
     * - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/filters-and-logs/event-logs
     * - JSON-RPC Methods: [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs)
     *
     * @param args - {@link GetLogsParameters}
     * @returns A list of event logs. {@link GetLogsReturnType}
     *
     * @example
     * import { createPublicClient, http, parseAbiItem } from 'viem'
     * import { mainnet } from 'viem/chains'
     *
     * const client = createPublicClient({
     *   chain: mainnet,
     *   transport: http(),
     * })
     * const logs = await client.getLogs()
     */
    getLogs: <
        const abiEvent extends AbiEvent | undefined = undefined,
        const abiEvents extends readonly AbiEvent[] | readonly unknown[] | undefined = abiEvent extends AbiEvent
            ? [abiEvent]
            : undefined,
        strict extends boolean | undefined = undefined,
        fromBlock extends BlockNumber | BlockTag | undefined = undefined,
        toBlock extends BlockNumber | BlockTag | undefined = undefined,
    >(
        args?: GetLogsParameters<abiEvent, abiEvents, strict, fromBlock, toBlock> | undefined,
    ) => Promise<GetLogsReturnType<abiEvent, abiEvents, strict, fromBlock, toBlock>>;
    /**
     * Returns information about a [Transaction](https://viem.sh/docs/glossary/terms#transaction) given a hash or block identifier.
     *
     * - Docs: https://viem.sh/docs/actions/public/getTransaction
     * - Example: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions/fetching-transactions
     * - JSON-RPC Methods: [`eth_getTransactionByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionByHash)
     *
     * @param args - {@link GetTransactionParameters}
     * @returns The transaction information. {@link GetTransactionReturnType}
     *
     * @example
     * import { createPublicClient, http } from 'viem'
     * import { mainnet } from 'viem/chains'
     *
     * const client = createPublicClient({
     *   chain: mainnet,
     *   transport: http(),
     * })
     * const transaction = await client.getTransaction({
     *   hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
     * })
     */
    getTransaction: <blockTag extends BlockTag = "latest">(
        args: GetTransactionParameters<blockTag>,
    ) => Promise<GetTransactionReturnType<chain, blockTag>>;
    /**
     * Returns the [Transaction Receipt](https://viem.sh/docs/glossary/terms#transaction-receipt) given a [Transaction](https://viem.sh/docs/glossary/terms#transaction) hash.
     *
     * - Docs: https://viem.sh/docs/actions/public/getTransactionReceipt
     * - Example: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions/fetching-transactions
     * - JSON-RPC Methods: [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt)
     *
     * @param args - {@link GetTransactionReceiptParameters}
     * @returns The transaction receipt. {@link GetTransactionReceiptReturnType}
     *
     * @example
     * import { createPublicClient, http } from 'viem'
     * import { mainnet } from 'viem/chains'
     *
     * const client = createPublicClient({
     *   chain: mainnet,
     *   transport: http(),
     * })
     * const transactionReceipt = await client.getTransactionReceipt({
     *   hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
     * })
     */
    getTransactionReceipt: (args: GetTransactionReceiptParameters) => Promise<GetTransactionReceiptReturnType<chain>>;
};

export function indexerActions<
    transport extends Transport = Transport,
    chain extends Chain | undefined = Chain | undefined,
    account extends Account | undefined = Account | undefined,
>(client: Client<transport, chain, account>): IndexerActions<transport, chain, account> {
    return {
        getBlock: (args) => getBlock(client, args),
        getBytecode: (args) => getBytecode(client, args),
        getCode: (args) => getBytecode(client, args),
        getLogs: (args) => getLogs(client, args as any),
        getTransaction: (args) => getTransaction(client, args),
        getTransactionReceipt: (args) => getTransactionReceipt(client, args),
    };
}
