import { providers, utils, Wallet } from "ethers";

export const anvilSigners = utils.HDNode.fromMnemonic("test test test test test test test test test test test junk");

/** Default Anvil signer ids that generates 10 wallets */
export type AnvilSignerId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
/**
 * Get anvil signer from id (0-9)
 * @param id
 */
export function getAnvilSigner(id: AnvilSignerId) {
    const pkey = anvilSigners.derivePath(`m/44'/60'/0'/0/${id++}`).privateKey;
    return new Wallet(pkey);
}

export const testChainId = 1337;
export const testNetworkId = "1337";
export const testSigner = getAnvilSigner(1);
export const testNetwork = {
    name: "localhost",
    config: { chainId: parseInt(testNetworkId), accounts: [testSigner._signingKey().privateKey] },
};

/**
 * Get ganache provider as an ethers-v5 provider
 * https://github.com/trufflesuite/ganache#as-an-ethersjs-provider
 * @param chainId
 * @returns
 */
export async function getGanacheProvider(chainId: number = testChainId) {
    const ganache = await import("ganache");
    const ganacheProvider = ganache.provider({
        logging: {
            quiet: true,
        },
        chain: {
            chainId,
        },
        wallet: {
            mnemonic: "test test test test test test test test test test test junk",
        },
    }) as any;
    const provider = new providers.Web3Provider(ganacheProvider);

    return provider;
}

/**
 * Get ganache provider as EIP1193 provider
 * https://github.com/trufflesuite/ganache#as-an-eip-1193-provider-only
 * @param chainId
 * @returns
 */
export async function getGanacheProviderEIP1193(chainId: number = testChainId) {
    const ganache = await import("ganache");
    const ganacheProvider = ganache.provider({
        logging: {
            quiet: true,
        },
        chain: {
            chainId,
        },
        wallet: {
            mnemonic: "test test test test test test test test test test test junk",
        },
    }) as any;

    return ganacheProvider;
}
