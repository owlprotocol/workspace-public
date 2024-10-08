import { Client, Transport, Chain, Account, Hash } from "viem";
import { getAction } from "viem/utils";
import { writeContract, simulateContract, getChainId } from "viem/actions";
import { UserOperation, getUserOperationHash } from "viem/account-abstraction";
import { getSupportedEntryPoints } from "./getSupportedEntryPoints.js";
import { handleOps, errors as IEntryPointErrors } from "../../artifacts/IEntryPoint.js";
import { toPackedUserOperation } from "../../models/PackedUserOperation.js";
import { encodeUserOp } from "../../models/UserOperation.js";

/**
 * Broadcasts a User Operation to the Bundler.
 *
 * - Docs: https://viem.sh/actions/bundler/sendUserOperation
 *
 * @param client - Client to use
 * @param parameters - {@link SendUserOperationParameters}
 * @returns The User Operation hash. {@link SendUserOperationReturnType}
 *
 * @example
 * import { createBundlerClient, http, parseEther } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { toSmartAccount } from 'viem/accounts'
 * import { sendUserOperation } from 'viem/actions'
 *
 * const account = await toSmartAccount({ ... })
 *
 * const bundlerClient = createBundlerClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const values = await sendUserOperation(bundlerClient, {
 *   account,
 *   calls: [{ to: '0x...', value: parseEther('1') }],
 * })
 */
export async function sendUserOperation(
    client: Client<Transport, Chain | undefined, Account>,
    parameters: UserOperation<"0.7">,
): Promise<Hash> {
    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));

    const supportedEntryPoints = await getAction(client, getSupportedEntryPoints, "getSupportedEntryPoints")({});
    const entryPointAddress = supportedEntryPoints[0];

    const userOperation = parameters;
    const userOpPacked = toPackedUserOperation(encodeUserOp(userOperation));
    //types seem to be inferred as [never[], Address]
    const handleOpsArgs = [[userOpPacked] as any[], client.account.address] as const;

    const { request } = await getAction(
        client,
        simulateContract,
        "simulateContract",
    )({
        account: client.account,
        address: entryPointAddress,
        abi: [handleOps, ...IEntryPointErrors],
        functionName: "handleOps",
        args: handleOpsArgs,
    });

    //Submit userOp in background
    getAction(client, writeContract, "writeContract")(request as any);

    const userOpHash = getUserOperationHash({
        userOperation: userOperation,
        entryPointAddress: entryPointAddress,
        entryPointVersion: "0.7",
        chainId,
    });

    return userOpHash;
}
