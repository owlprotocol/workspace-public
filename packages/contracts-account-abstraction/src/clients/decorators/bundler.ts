import {
    EstimateUserOperationGasReturnType,
    GetSupportedEntryPointsReturnType,
    SendUserOperationReturnType,
    UserOperation,
} from "viem/account-abstraction";
import { Transport, Chain, Account, Client, Address, GetChainIdReturnType } from "viem";

import { getChainId } from "viem/actions";
import {
    estimateUserOperationGas,
    EstimateUserOperationGasParameters07,
} from "../../actions/bundler/estimateUserOperationGas.js";
import { getSupportedEntryPoints } from "../../actions/bundler/getSupportedEntryPoints.js";
import { sendUserOperation } from "../../actions/bundler/sendUserOperation.js";

export type BackendBundlerActions = {
    getChainId: () => Promise<GetChainIdReturnType>;
    estimateUserOperationGas: (
        parameters: EstimateUserOperationGasParameters07,
    ) => Promise<EstimateUserOperationGasReturnType<undefined, undefined, undefined, "0.7">>;
    getSupportedEntryPoints: () => Promise<GetSupportedEntryPointsReturnType>;
    sendUserOperation: (parameters: UserOperation<"0.7">) => Promise<SendUserOperationReturnType>;
};

export function backendBundlerActions<
    transport extends Transport = Transport,
    chain extends Chain | undefined = Chain | undefined,
    account extends Account = Account,
>(
    client: Client<transport, chain, account> & {
        entryPointSimulationsAddress: Address;
    },
): BackendBundlerActions {
    return {
        estimateUserOperationGas: (parameters) => estimateUserOperationGas(client, parameters),
        getChainId: () => getChainId(client),
        getSupportedEntryPoints: () => getSupportedEntryPoints(client),
        sendUserOperation: (parameters) => sendUserOperation(client, parameters),
    };
}
