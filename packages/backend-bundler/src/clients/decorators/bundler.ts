import { Transport, Chain, Account, Client, Address } from "viem";

import { BackendBundlerActions } from "@owlprotocol/contracts-account-abstraction/clients";
import { estimateUserOperationGas, getSupportedEntryPoints } from "@owlprotocol/contracts-account-abstraction/actions";

import { getChainId } from "viem/actions";
import { sendUserOperationWithFirebase } from "../../actions/bundler/sendUserOperation.js";

export function backendBundlerWithFirebaseActions<
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
        sendUserOperation: (parameters) => sendUserOperationWithFirebase(client, parameters),
    };
}
