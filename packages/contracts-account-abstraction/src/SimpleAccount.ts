import { Address } from "abitype";
import { Hex, encodeDeployData, encodeFunctionData, getCreate2Address, getCreateAddress, numberToBytes } from "viem";
import { abi as SimpleAccountAbi } from "./artifacts/SimpleAccount.js";
import { ERC1967Proxy } from "./artifacts/ERC1967Proxy.js";
import { SIMPLE_ACCOUNT_FACTORY_ADDRESS } from "./constants.js";

/**
 * Compute SimpleAccount address without any network calls
 * This should match the result of SimpleAccountFactory.getAddress(owner, salt)
 * @param args
 * @param options factoryAddress and ERC1967Proxy bytecode. This can vary depending on compilation settings.
 */
export function getSimpleAccountAddress(
    args: { owner: Address; salt?: bigint },
    options?: {
        factoryAddress: Address;
        proxyBytecode: Hex;
    },
): Address {
    const { factoryAddress, proxyBytecode } = options ?? {
        factoryAddress: SIMPLE_ACCOUNT_FACTORY_ADDRESS,
        proxyBytecode: ERC1967Proxy.bytecode,
    };
    //Simple account implementation, gets deployed by factory automatically using CREATE
    const simpleAccountImplementation = getCreateAddress({
        from: factoryAddress,
        nonce: 1n,
    });
    //Simple account initialization
    const initData = encodeFunctionData({
        abi: SimpleAccountAbi,
        functionName: "initialize",
        args: [args.owner],
    });
    //Simple account proxy
    const proxyDeployData = encodeDeployData({
        bytecode: proxyBytecode,
        abi: ERC1967Proxy.abi,
        args: [simpleAccountImplementation, initData],
    });

    const salt = args.salt ?? 0n;
    return getCreate2Address({
        from: factoryAddress,
        salt: numberToBytes(salt, { size: 32 }),
        bytecode: proxyDeployData,
    });
}
