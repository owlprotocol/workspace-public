import { API_REST_BASE_URL } from "@owlprotocol/envvars";
import { Address, createClient, http, LocalAccount, SignableMessage } from "viem";
import { toAccount } from "viem/accounts";
import { getAddresses, signMessage } from "viem/actions";

/***** Custodial User *****/
/**
 * Params for instantiating API URL for Custodial User service
 */
export interface ProjectUserCustodialUrlParams {
    userId: string;
    owlApiRestBaseUrl?: string;
}

/**
 * Get base REST url for Custodial User operations
 * @param params
 * @returns `<base>/users/custodial/<userId>`
 */
export function getUserCustodialUrl(params: ProjectUserCustodialUrlParams): string {
    const { userId, owlApiRestBaseUrl = API_REST_BASE_URL } = params;
    return `${owlApiRestBaseUrl}/users/custodial/${userId}`;
}

/***** Signer *****/
/**
 * Get signer REST url for Custodial User
 * @param params
 * @returns `<base>/users/custodial/<userId>/signRpc`
 */
export function getUserCustodialSignRpcUrl(params: ProjectUserCustodialUrlParams): string {
    return `${getUserCustodialUrl(params)}/signRpc`;
}

/**
 * Get signer Transport for Custodial User
 * @param params
 * @returns http transport
 */
export function getUserCustodialSignTransport(params: ProjectUserCustodialUrlParams & { apiKey: string }) {
    return http(getUserCustodialSignRpcUrl(params), {
        fetchOptions: { headers: { "x-api-key": params.apiKey } },
    });
}

//TODO: Refactor to general util that just takes a transport
export async function createUserCustodialAccount(
    params: ProjectUserCustodialUrlParams & { apiKey: string; address?: Address },
): Promise<LocalAccount> {
    const transport = getUserCustodialSignTransport(params);

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
 * Get wallet REST url for Custodial User
 * @param params
 * @returns
 */
export function getUserCustodialWalletRpcUrl(params: ProjectUserCustodialUrlParams & { chainId: number }): string {
    return `${getUserCustodialUrl(params)}/network/${params.chainId}/walletRpc`;
}
