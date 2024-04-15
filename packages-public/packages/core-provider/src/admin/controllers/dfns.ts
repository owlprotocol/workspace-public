import { AsymmetricKeySigner } from "@dfns/sdk-keysigner";
import { DfnsWallet } from "@dfns/lib-viem";
import { DfnsApiClient } from "@dfns/sdk";
import {
    DFNS_API_URL,
    DFNS_APP_ID,
    DFNS_APP_ORIGIN,
    DFNS_CRED_ID,
    DFNS_PRIVATE_KEY,
    DFNS_AUTH_TOKEN,
    DFNS_MOCK,
} from "@owlprotocol/envvars";
import { DfnsApiClientInterface, DfnsApiClientMock } from "@owlprotocol/dfns-sdk-mock";
import { projectUserWalletDfnsResource, projectWalletDfnsResource } from "@owlprotocol/core-firebase/admin";
import { AccountSource, Address, LocalAccount } from "viem";
import { toAccount } from "viem/accounts";
import { CreateWalletResponse, GetWalletResponse } from "@dfns/sdk/generated/wallets/types.js";

//Object MUST stay in memory to preserve data (except if using deterministic)
const mnemonic = "fix negative hand antique model glass journey unable pattern brand injury barely";
const dfnsClientMock = new DfnsApiClientMock(mnemonic);
/**
 * Get DFNS Client
 * Mock in dev mode
 * @returns
 */
export function getDfnsClient(): DfnsApiClientInterface {
    if (DFNS_MOCK === "false") {
        console.debug("Running production DFNS with API Keys");
        if (!DFNS_PRIVATE_KEY) throw new Error(`DFNS_PRIVATE_KEY ${DFNS_PRIVATE_KEY}`);
        if (!DFNS_CRED_ID) throw new Error(`DFNS_CRED_ID ${DFNS_CRED_ID}`);
        if (!DFNS_APP_ORIGIN) throw new Error(`DFNS_APP_ORIGIN ${DFNS_APP_ORIGIN}`);
        if (!DFNS_APP_ID) throw new Error(`DFNS_APP_ID ${DFNS_APP_ID}`);

        const dfnsSigner = new AsymmetricKeySigner({
            privateKey: DFNS_PRIVATE_KEY,
            credId: DFNS_CRED_ID,
            appOrigin: DFNS_APP_ORIGIN,
        });

        const dfnsClient = new DfnsApiClient({
            appId: DFNS_APP_ID,
            authToken: DFNS_AUTH_TOKEN,
            baseUrl: DFNS_API_URL,
            signer: dfnsSigner,
        });

        return dfnsClient as DfnsApiClientInterface;
    } else {
        console.debug("Running development mock DFNS");
        return dfnsClientMock;
    }
}

export const dfnsClient = getDfnsClient();

/**
 * Get DFNS wallet viem account
 * @param dfnsClient
 * @param walletId
 * @returns
 */
export async function getDfnsAccount(dfnsClient: DfnsApiClientInterface, walletId: string): Promise<LocalAccount> {
    const account = await DfnsWallet.init({
        walletId,
        dfnsClient: dfnsClient as DfnsApiClient,
        maxRetries: 10,
    });
    return toAccount(account as AccountSource) as LocalAccount;
}

/**
 * Get DFNS wallet
 * @param dfnsClient
 * @param walletId
 * @returns
 */
export async function getDfnsWallet(dfnsClient: DfnsApiClientInterface, walletId: string): Promise<GetWalletResponse> {
    let wallet: GetWalletResponse;
    try {
        wallet = await dfnsClient.wallets.getWallet({ walletId });
    } catch (error) {
        //if testing, we can use the mock client to create a wallet to avoid complex setups
        if (dfnsClient === dfnsClientMock) {
            //Mock wallet, try to create wallet
            //create deterministic wallet if non-existant
            return await dfnsClient.wallets.createWallet({
                body: {
                    network: "Ethereum",
                    externalId: walletId,
                },
            });
        }

        throw error;
    }

    if (wallet.status === "Active") {
        return wallet;
    } else {
        throw new Error(`Wallet ${wallet.id} unexpected ${wallet.status}`);
    }
}

/**
 * Create DFNS Wallet
 * @param externalId
 * @returns
 */
export async function createDfnsWallet(
    dfnsClient: DfnsApiClientInterface,
    externalId: string,
): Promise<CreateWalletResponse> {
    const wallet = await dfnsClient.wallets.createWallet({
        body: {
            //In prod api use "Ethereum", in sandbox use "EthereumSepolia"
            //This has no bearing on signing ability
            network: DFNS_API_URL === "https://api.dfns.io" ? "Ethereum" : "EthereumSepolia",
            externalId,
        },
    });

    if (wallet.status === "Active") {
        return wallet;
    } else {
        throw new Error(`Wallet ${wallet.id} unexpected status ${wallet.status}`);
    }
}

/**
 * Create DFNS Wallet for project user
 * This wallet is meant to be used by consumers of the project when interacting with smart contracts
 * such as transfering their tokens.
 * @param dfnsClient
 * @param args userId, projectId
 * @returns wallet for project user
 */
export async function createDfnsWalletForProjectUser(
    dfnsClient: DfnsApiClientInterface,
    args: { userId: string; projectId: string },
): Promise<CreateWalletResponse> {
    const { userId, projectId } = args;
    const walletsCount = await projectUserWalletDfnsResource.getWhereCount({ projectId, userId });
    const externalId = `${projectId}-project-${userId}-wallet-${walletsCount}`;
    const wallet = await createDfnsWallet(dfnsClient, externalId);
    await projectUserWalletDfnsResource.set({
        projectId,
        walletId: wallet.id,
        status: wallet.status as any,
        userId,
        address: wallet.address! as Address,
    });

    return wallet;
}

/**
 * Get or create a DFNS Wallet for project user
 * This wallet is meant to be used by consumers of the project when interacting with smart contracts
 * such as transfering their tokens.
 * @param dfnsClient
 * @param args userId, projectId
 * @returns wallet for project user
 */
export async function getOrCreateDfnsWalletForProjectUser(
    dfnsClient: DfnsApiClientInterface,
    args: { userId: string; projectId: string },
): Promise<GetWalletResponse | CreateWalletResponse> {
    const { userId, projectId } = args;
    const dfnsWalletDoc = await projectUserWalletDfnsResource.getWhereFirst({ projectId, userId });
    const dfnsWallet = dfnsWalletDoc
        ? await getDfnsWallet(dfnsClient, dfnsWalletDoc.walletId)
        : await createDfnsWalletForProjectUser(dfnsClient, args);

    return dfnsWallet;
}

/**
 * Create DFNS Wallet for project
 * This wallet is meant to be used by developers of the project for admin operations such as deploying
 * new smart contracts or managing them (eg. mint tokens)
 * @param dfnsClient
 * @param args projectId
 * @returns wallet for project
 */
export async function createDfnsWalletForProject(
    dfnsClient: DfnsApiClientInterface,
    args: { projectId: string },
): Promise<CreateWalletResponse> {
    const { projectId } = args;
    const walletsCount = await projectWalletDfnsResource.getWhereCount({ projectId });
    const externalId = `${projectId}-project-wallet-${walletsCount}`;
    const wallet = await createDfnsWallet(dfnsClient, externalId);
    await projectWalletDfnsResource.set({
        projectId,
        walletId: wallet.id,
        status: wallet.status as any,
        address: wallet.address! as Address,
    });

    return wallet;
}

/**
 * Get or create a DFNS Wallet for project
 * This wallet is meant to be used by developers of the project for admin operations such as deploying
 * new smart contracts or managing them (eg. mint tokens)
 * @param dfnsClient
 * @param args projectId
 * @returns wallet for project
 */
export async function getOrCreateDfnsWalletForProject(
    dfnsClient: DfnsApiClientInterface,
    args: { projectId: string },
): Promise<GetWalletResponse | CreateWalletResponse> {
    const { projectId } = args;
    const dfnsWalletDoc = await projectWalletDfnsResource.getWhereFirst({ projectId });
    const dfnsWallet = dfnsWalletDoc
        ? await getDfnsWallet(dfnsClient, dfnsWalletDoc.walletId)
        : await createDfnsWalletForProject(dfnsClient, args);

    return dfnsWallet;
}
