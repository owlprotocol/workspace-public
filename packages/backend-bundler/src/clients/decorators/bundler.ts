import { Transport, Chain, Account, Client, Address } from "viem";

import { BackendBundlerActions } from "@owlprotocol/contracts-account-abstraction/clients";
import { estimateUserOperationGas, getSupportedEntryPoints } from "@owlprotocol/contracts-account-abstraction/actions";

import { getChainId } from "viem/actions";
import { getUserOperationWithFirebase } from "../../actions/bundler/getUserOperation.js";
import { getUserOperationReceiptWithFirebase } from "../../actions/bundler/getUserOperationReceipt.js";
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
        getUserOperation: (parameters) => getUserOperationWithFirebase(client, parameters),
        getUserOperationReceipt: (parameters) => getUserOperationReceiptWithFirebase(client, parameters),
        sendUserOperation: (parameters) => sendUserOperationWithFirebase(client, parameters),
    };
}
