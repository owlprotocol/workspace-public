import {
    Abi,
    decodeEventLog,
    parseAbi,
    toEventHash,
    Log,
    PublicClient,
    Transport,
    Chain,
    zeroAddress,
    toFunctionSignature,
} from "viem";
import { AbiEvent, formatAbiItem } from "abitype";
import { events as Create2FactoryEvents } from "@owlprotocol/contracts-create2factory/artifacts/events";
import { events as AccountAbstractionEvents } from "@owlprotocol/contracts-account-abstraction/artifacts/events";
import { events as DiamondEvents } from "@owlprotocol/contracts-diamond/artifacts/events";
import { Transfer as TransferERC20, Approval as ApprovalERC20 } from "@owlprotocol/contracts-diamond/artifacts/IERC20";
import { Transfer as TransferERC721 } from "@owlprotocol/contracts-diamond/artifacts/IERC721";
import { TransferSingle, TransferBatch } from "@owlprotocol/contracts-diamond/artifacts/IERC1155";

import { uniqBy } from "lodash-es";
import { EthLogAbiResource } from "@owlprotocol/eth-firebase/models";
import { updateERC20Allowance, updateERC20Balance } from "./erc20.js";
import { updateERC1155Balance } from "./erc1155.js";
import { updateERC721Owner } from "./erc721.js";
import { EthResources } from "../types/EthResources.js";

/**
 * Return whether event conforms to abi by checking
 * - topic[0] = event hash
 * - topics.length - 1 = event.inputs.indexed
 * @warning imperfect as does not check data length
 * @param log
 * @param abi
 */
export function isStrictEventAbi(log: Pick<Log, "topics" | "data">, abi: AbiEvent): boolean {
    const logSighash = log.topics[0];
    //Raw log with no topics
    if (!logSighash) return false;
    //Number of fields indexed excluding topic0 (event signature)
    const logIndexedFieldsCount = log.topics.length - 1;

    const abiSighash = toEventHash(abi);
    const abiIndexedFieldsCount = abi.inputs.reduce((acc, item) => acc + (item.indexed ? 1 : 0), 0);

    return abiSighash === logSighash && abiIndexedFieldsCount === logIndexedFieldsCount;
}

/**
 * Decode a log with common abis
 * @param log
 * @param ethLogAbiResource
 * @returns
 */
export function decodeLogWithAbis(
    log: Pick<Log, "address" | "topics" | "data"> & { blockNumber: bigint | `0x${string}` },
    sdk: {
        publicClient?: PublicClient<Transport, Chain>;
    } & Pick<EthResources, "erc20Balance" | "erc20Allowance" | "erc721" | "erc1155Balance">,
): {
    eventName?: string;
    args?: any[] & Record<string, any>;
} | null {
    /** Local decodeing of common abis */
    try {
        if (isStrictEventAbi(log, TransferERC20)) {
            const { eventName, args } = decodeEventLog({
                abi: [TransferERC20],
                data: log.data,
                topics: log.topics,
                strict: true,
            });
            if (sdk.publicClient && sdk.erc20Balance) {
                if (args.from != zeroAddress) {
                    try {
                        updateERC20Balance(
                            {
                                address: log.address,
                                account: args.from,
                                blockNumber: BigInt(log.blockNumber),
                            },
                            { publicClient: sdk.publicClient, erc20Balance: sdk.erc20Balance },
                        );
                    } catch (error) {
                        console.error(error);
                    }
                }
                if (args.to != zeroAddress) {
                    try {
                        updateERC20Balance(
                            {
                                address: log.address,
                                account: args.to,
                                blockNumber: BigInt(log.blockNumber),
                            },
                            { publicClient: sdk.publicClient, erc20Balance: sdk.erc20Balance },
                        );
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
            return { eventName, args } as any;
        } else if (isStrictEventAbi(log, ApprovalERC20)) {
            const { eventName, args } = decodeEventLog({
                abi: [ApprovalERC20],
                data: log.data,
                topics: log.topics,
                strict: true,
            });
            if (sdk.publicClient && sdk.erc20Allowance) {
                if (args.owner != zeroAddress) {
                    try {
                        updateERC20Allowance(
                            {
                                address: log.address,
                                account: args.owner,
                                spender: args.spender,
                                blockNumber: BigInt(log.blockNumber),
                            },
                            { publicClient: sdk.publicClient, erc20Allowance: sdk.erc20Allowance },
                        );
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
            return { eventName, args } as any;
        } else if (isStrictEventAbi(log, TransferERC721)) {
            const { eventName, args } = decodeEventLog({
                abi: [TransferERC721],
                data: log.data,
                topics: log.topics,
                strict: true,
            });
            if (sdk.publicClient && sdk.erc721) {
                try {
                    updateERC721Owner(
                        {
                            address: log.address,
                            tokenId: args.tokenId,
                            owner: args.to,
                            blockNumber: BigInt(log.blockNumber),
                        },
                        { publicClient: sdk.publicClient, erc721: sdk.erc721 },
                    );
                } catch (error) {
                    console.error(error);
                }
            }
            return { eventName, args } as any;
        } else if (isStrictEventAbi(log, TransferSingle)) {
            const { eventName, args } = decodeEventLog({
                abi: [TransferSingle],
                data: log.data,
                topics: log.topics,
                strict: true,
            });

            if (sdk.publicClient && sdk.erc1155Balance) {
                if (args.from != zeroAddress) {
                    try {
                        updateERC1155Balance(
                            {
                                address: log.address,
                                account: args.from,
                                id: args.id,
                                blockNumber: BigInt(log.blockNumber),
                            },
                            { publicClient: sdk.publicClient, erc1155Balance: sdk.erc1155Balance },
                        );
                    } catch (error) {
                        console.error(error);
                    }
                }

                if (args.to != zeroAddress) {
                    try {
                        updateERC1155Balance(
                            {
                                address: log.address,
                                account: args.to,
                                id: args.id,
                                blockNumber: BigInt(log.blockNumber),
                            },
                            { publicClient: sdk.publicClient, erc1155Balance: sdk.erc1155Balance },
                        );
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
            return { eventName, args } as any;
        } else if (isStrictEventAbi(log, TransferBatch)) {
            const { eventName, args } = decodeEventLog({
                abi: [TransferBatch],
                data: log.data,
                topics: log.topics,
                strict: true,
            });

            //TODO: Batch call to fetch?
            if (sdk.publicClient && sdk.erc1155Balance) {
                if (args.from != zeroAddress) {
                    args.ids.forEach((id) => {
                        try {
                            updateERC1155Balance(
                                {
                                    address: log.address,
                                    account: args.from,
                                    id,
                                    blockNumber: BigInt(log.blockNumber),
                                },
                                { publicClient: sdk.publicClient!, erc1155Balance: sdk.erc1155Balance! },
                            );
                        } catch (error) {
                            console.error(error);
                        }
                    });
                }

                if (args.to != zeroAddress) {
                    args.ids.forEach((id) => {
                        try {
                            updateERC1155Balance(
                                {
                                    address: log.address,
                                    account: args.to,
                                    id,
                                    blockNumber: BigInt(log.blockNumber),
                                },
                                { publicClient: sdk.publicClient!, erc1155Balance: sdk.erc1155Balance! },
                            );
                        } catch (error) {
                            console.error(error);
                        }
                    });
                }
            }

            return { eventName, args } as any;
        } else {
            const { eventName, args } = decodeEventLog({
                abi: uniqBy(
                    [...Create2FactoryEvents, ...AccountAbstractionEvents, ...DiamondEvents] as AbiEvent[],
                    (f) =>
                        `${toFunctionSignature(formatAbiItem(f))}-${f.inputs.filter((input) => input.indexed).length}`,
                ),
                data: log.data,
                topics: log.topics,
                strict: true,
            });
            return { eventName, args } as any;
        }
    } catch (error) {
        //Failed to decode log
        return null;
    }
}

/**
 * Decode a log by fetching its abi from Firebase
 * @param log
 * @param ethLogAbiResource
 * @returns
 */
export async function decodeLogWithFirebase<T extends Pick<Log, "topics" | "data">>(
    log: T,
    ethLogAbiResource: EthLogAbiResource,
): Promise<{
    eventName?: string;
    args?: any[] & Record<string, any>;
} | null> {
    /** Search Firebase Database */
    //Number of fields indexed excluding topic0 (event signature)
    const eventSighash = log.topics[0];
    //Raw log with no topics
    if (!eventSighash) return null;

    const indexedFieldsCount = log.topics.length - 1;
    const ethLogAbi = await ethLogAbiResource.getOrNull({ eventSighash, indexedFieldsCount });
    if (!ethLogAbi) return null;

    //Event Format to Event Abi
    const eventFormat = ethLogAbi.eventFormat;
    const eventAbi: Abi = parseAbi([eventFormat]);

    try {
        const { eventName, args } = decodeEventLog({
            abi: eventAbi,
            data: log.data,
            topics: log.topics,
            strict: true,
        });
        return {
            eventName,
            args,
        } as any;
    } catch (error) {
        //Failed to decode log
        return null;
    }
}
