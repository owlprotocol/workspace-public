import { Address, LocalAccount, SignableMessage, createClient } from "viem";
import { getAddresses, signMessage } from "viem/actions";
import { toAccount } from "viem/accounts";
import { API_REST_BASE_URL } from "@owlprotocol/envvars";
import { Auth, getOwlAdminSignTransport, getOwlUserSignTransport } from "./transports.js";

export interface CreateUserLocalClientParameters {
    jwt: string;
    projectId: string;
    address?: Address;
}

export interface CreateAdminLocalClientParameters {
    auth: Auth;
    projectId: string;
    address?: Address;
}

export async function createUserLocalClient(
    parameters: CreateUserLocalClientParameters,
    owlRestApiUrl = API_REST_BASE_URL,
): Promise<LocalAccount> {
    const { jwt, projectId } = parameters;
    let { address } = parameters;

    const transport = getOwlUserSignTransport(jwt, projectId, owlRestApiUrl);

    const client = createClient({ transport }).extend((client) => ({
        getAddresses: () => getAddresses(client),
    }));

    if (!address) {
        [address] = await client.getAddresses();

        if (!address) {
            throw new Error("No address for this user");
        }
    }

    const account = address!;

    // Now that we have an account, extend with sign message too
    const clientWithAccount = client.extend((client) => ({
        signMessage: ({ message }: { message: SignableMessage }) => signMessage(client, { message, account }),
    }));

    return toAccount({
        address,
        async signMessage({ message }) {
            return clientWithAccount.signMessage({ message });
        },
        // TODO: Implement
        // async signTransaction(transaction, args) {
        async signTransaction() {
            throw new Error("Unimplemented");
        },
        // TODO: Implement
        // async signTypedData(typedData) {
        async signTypedData() {
            // if (!typedData.types || !typedData.message || !typedData.primaryType) {
            //     throw new Error("Typed data types must be defined");
            // }
            // return walletClient.signTypedData({
            //     account,
            //     message: typedData.message,
            //     primaryType: typedData.primaryType,
            //     types: typedData.types,
            //     domain: typedData.domain,
            // });
            throw new Error("Unimplemented");
        },
    });
}

export async function createAdminLocalClient(
    parameters: CreateAdminLocalClientParameters,
    owlRestApiUrl = API_REST_BASE_URL,
): Promise<LocalAccount> {
    const { auth, projectId } = parameters;
    let { address } = parameters;

    const transport = getOwlAdminSignTransport(auth, projectId, owlRestApiUrl);

    const client = createClient({ transport }).extend((client) => ({
        getAddresses: () => getAddresses(client),
    }));

    if (!address) {
        [address] = await client.getAddresses();

        if (!address) {
            throw new Error("No address for this user");
        }
    }

    const account = address!;

    // Now that we have an account, extend with sign message too
    const clientWithAccount = client.extend((client) => ({
        signMessage: ({ message }: { message: SignableMessage }) => signMessage(client, { message, account }),
    }));

    return toAccount({
        address,
        async signMessage({ message }) {
            return clientWithAccount.signMessage({ message });
        },
        // TODO: Implement
        // async signTransaction(transaction, args) {
        async signTransaction() {
            throw new Error("Unimplemented");
        },
        // TODO: Implement
        // async signTypedData(typedData) {
        async signTypedData() {
            // if (!typedData.types || !typedData.message || !typedData.primaryType) {
            //     throw new Error("Typed data types must be defined");
            // }
            // return walletClient.signTypedData({
            //     account,
            //     message: typedData.message,
            //     primaryType: typedData.primaryType,
            //     types: typedData.types,
            //     domain: typedData.domain,
            // });
            throw new Error("Unimplemented");
        },
    });
}
