import { decodeEventLog, Log, Transport, Chain, zeroAddress, Client } from "viem";

import { Transfer as TransferERC20, Approval as ApprovalERC20 } from "@owlprotocol/contracts-diamond/artifacts/IERC20";
import { Transfer as TransferERC721 } from "@owlprotocol/contracts-diamond/artifacts/IERC721";
import { TransferSingle, TransferBatch } from "@owlprotocol/contracts-diamond/artifacts/IERC1155";

import { ERC1155, ERC1155Balance, ERC20Allowance, ERC20Balance, ERC721 } from "@owlprotocol/eth-firebase";
import { getERC20Allowance, getERC20Balance } from "./erc20.js";
import { getERC1155Balance } from "./erc1155.js";
import { getERC721Owner } from "./erc721.js";
import { isStrictEventAbi } from "../controllers/isStrictEventAbi.js";

type EthState = ERC20Balance | ERC20Allowance | ERC721 | ERC1155 | ERC1155Balance;

/**
 * Update state for log
 * @param log
 * @param ethLogAbiResource
 * @returns
 */
export function updateStateForLog<chain extends Chain | undefined>(
    client: Client<Transport, chain>,
    log: Pick<Log, "address" | "topics" | "data"> & { blockNumber: bigint | `0x${string}` },
): Promise<EthState>[] {
    const promises: Promise<EthState>[] = [];

    /** Local decodeing of common abis */
    if (isStrictEventAbi(log, TransferERC20)) {
        const { args } = decodeEventLog({
            abi: [TransferERC20],
            data: log.data,
            topics: log.topics,
            strict: true,
        });
        if (args.from != zeroAddress) {
            promises.push(
                getERC20Balance(client, {
                    address: log.address,
                    account: args.from,
                    blockNumber: BigInt(log.blockNumber),
                }),
            );
        }
        if (args.to != zeroAddress) {
            promises.push(
                getERC20Balance(client, {
                    address: log.address,
                    account: args.to,
                    blockNumber: BigInt(log.blockNumber),
                }),
            );
        }
    } else if (isStrictEventAbi(log, ApprovalERC20)) {
        const { args } = decodeEventLog({
            abi: [ApprovalERC20],
            data: log.data,
            topics: log.topics,
            strict: true,
        });
        if (args.owner != zeroAddress) {
            promises.push(
                getERC20Allowance(client, {
                    address: log.address,
                    account: args.owner,
                    spender: args.spender,
                    blockNumber: BigInt(log.blockNumber),
                }),
            );
        }
    } else if (isStrictEventAbi(log, TransferERC721)) {
        const { args } = decodeEventLog({
            abi: [TransferERC721],
            data: log.data,
            topics: log.topics,
            strict: true,
        });
        promises.push(
            getERC721Owner(client, {
                address: log.address,
                tokenId: args.tokenId,
                owner: args.to,
                blockNumber: BigInt(log.blockNumber),
            }),
        );
    } else if (isStrictEventAbi(log, TransferSingle)) {
        const { args } = decodeEventLog({
            abi: [TransferSingle],
            data: log.data,
            topics: log.topics,
            strict: true,
        });

        if (args.from != zeroAddress) {
            promises.push(
                getERC1155Balance(client, {
                    address: log.address,
                    account: args.from,
                    id: args.id,
                    blockNumber: BigInt(log.blockNumber),
                }),
            );
        }

        if (args.to != zeroAddress) {
            promises.push(
                getERC1155Balance(client, {
                    address: log.address,
                    account: args.to,
                    id: args.id,
                    blockNumber: BigInt(log.blockNumber),
                }),
            );
        }
    } else if (isStrictEventAbi(log, TransferBatch)) {
        const { args } = decodeEventLog({
            abi: [TransferBatch],
            data: log.data,
            topics: log.topics,
            strict: true,
        });

        //TODO: Batch call to fetch?
        if (args.from != zeroAddress) {
            args.ids.forEach((id) => {
                promises.push(
                    getERC1155Balance(client, {
                        address: log.address,
                        account: args.from,
                        id,
                        blockNumber: BigInt(log.blockNumber),
                    }),
                );
            });
        }

        if (args.to != zeroAddress) {
            args.ids.forEach((id) => {
                promises.push(
                    getERC1155Balance(client, {
                        address: log.address,
                        account: args.to,
                        id,
                        blockNumber: BigInt(log.blockNumber),
                    }),
                );
            });
        }
    }

    return promises;
}
