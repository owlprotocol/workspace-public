import { API_REST_BASE_URL } from "@owlprotocol/envvars";
import { Address, createClient, http, LocalAccount, SignableMessage } from "viem";
import { toAccount } from "viem/accounts";
import { getAddresses, signMessage } from "viem/actions";

/***** Managed User *****/
/**
 * Params for instantiating API URL for Managed User service
 */
export interface ProjectUserManagedUrlParams {
    userId: string;
    owlApiRestBaseUrl?: string;
}

/**
 * Get base REST url for Managed User operations
 * @param params
 * @returns `<base>/users/managed/<userId>`
 */
export function getUserManagedUrl(params: ProjectUserManagedUrlParams): string {
    const { userId, owlApiRestBaseUrl = API_REST_BASE_URL } = params;
    return `${owlApiRestBaseUrl}/users/managed/${userId}`;
}

/***** Signer *****/
/**
 * Get signer REST url for Managed User
 * @param params
 * @returns `<base>/users/managed/<userId>/signRpc`
 */
export function getUserManagedSignRpcUrl(params: ProjectUserManagedUrlParams): string {
    return `${getUserManagedUrl(params)}/signRpc`;
}

/**
 * Get signer Transport for Managed User
 * @param params
 * @returns http transport
 */
export function getUserManagedSignTransport(params: ProjectUserManagedUrlParams & { apiKey: string }) {
    return http(getUserManagedSignRpcUrl(params), {
        fetchOptions: { headers: { "x-api-key": params.apiKey } },
    });
}

//TODO: Refactor to general util that just takes a transport
export async function createUserManagedAccount(
    params: ProjectUserManagedUrlParams & { apiKey: string; address?: Address },
): Promise<LocalAccount> {
    const transport = getUserManagedSignTransport(params);

    const client = createClient({ transport }).extend((client) => ({
        getAddresses: () => getAddresses(client),
    }));

    let address = params.address;
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
        signMessage: clientWithAccount.signMessage,
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

/***** Wallet *****/
//TODO: Later
/**
 * Get wallet REST url for Managed User
 * @param params
 * @returns
 */
export function getUserManagedWalletRpcUrl(params: ProjectUserManagedUrlParams & { chainId: number }): string {
    return `${getUserManagedUrl(params)}/network/${params.chainId}/walletRpc`;
}
