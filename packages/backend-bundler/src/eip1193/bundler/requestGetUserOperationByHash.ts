import { BundlerRpcSchema, EIP1193Parameters, EIP1193RequestFn, hexToNumber, PublicRpcSchema } from "viem";
import {
    createRequestGetUserOperationByHash,
    RpcGetUserOperationReturnType07,
} from "@owlprotocol/contracts-account-abstraction/eip1193";
import { ethUserOpResource } from "@owlprotocol/eth-firebase/admin";

export function createRequestGetUserOperationByHashWithFirebase(request: EIP1193RequestFn<PublicRpcSchema>) {
    const requestGetUserOperationByHash = createRequestGetUserOperationByHash(request);

    return async function (
        args: EIP1193Parameters<BundlerRpcSchema> & { method: "eth_getUserOperationByHash" },
    ): Promise<RpcGetUserOperationReturnType07> {
        const [hash] = args.params;
        const chainId = await request({ method: "eth_chainId" });

        const result = await requestGetUserOperationByHash(args);
        if (!result) return result;

        const ethUserOp = {
            chainId: hexToNumber(chainId),
            userOpHash: hash,
            ...result.userOperation,
        };
        ethUserOpResource.set(ethUserOp);

        return result;
    };
}
