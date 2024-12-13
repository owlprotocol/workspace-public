import { Account, Address, Chain, Client, formatEther, TransactionRequest, Transport } from "viem";
import { getAction } from "viem/utils";
import { getBalance, sendTransaction, waitForTransactionReceipt } from "viem/actions";
import { getOrDeployDeterministicDeployer, GetOrPrepareDeterministicContractReturnType } from "@owlprotocol/viem-utils";
import { prepareERC4337Contracts, setupVerifyingPaymaster } from "@owlprotocol/contracts-account-abstraction";
import { prepareDiamondFacets, prepareERC721Facets, prepareCoreContractFacets } from "@owlprotocol/contracts-diamond";
import { prepareHyperlaneContracts } from "@owlprotocol/contracts-hyperlane";
import { getOrPrepareCreate2Factory } from "@owlprotocol/contracts-create2factory";
import { verifyAllContracts } from "./verifyAllContracts.js";

// function getContractMetadata(contractName: string): SolcMetadata | undefined {
//     return allMetadata[contractName] ?? undefined;
// }

export async function prepareChainContracts(
    client: Client<Transport, Chain, Account>,
    parameters?: { mailboxAddress?: Address },
) {
    const { mailboxAddress } = parameters ?? {};
    const requests: TransactionRequest[] = [];

    const [erc4337Contracts, diamondFacets, coreFacets, erc721Facets, create2Factory] = await Promise.all([
        prepareERC4337Contracts(client),
        prepareDiamondFacets(client),
        prepareCoreContractFacets(client),
        prepareERC721Facets(client),
        getOrPrepareCreate2Factory(client),
    ]);

    requests.push(
        ...erc4337Contracts.requests,
        ...diamondFacets.requests,
        ...coreFacets.requests,
        ...erc721Facets.requests,
    );
    if (create2Factory.request) requests.push(create2Factory.request);

    const result = {
        ...erc4337Contracts,
        ...diamondFacets,
        ...coreFacets,
        ...erc721Facets,
        create2Factory,
        requests,
        hypErc20: undefined as undefined | GetOrPrepareDeterministicContractReturnType,
        hypErc20Fast: undefined as undefined | GetOrPrepareDeterministicContractReturnType,
        hypNative: undefined as undefined | GetOrPrepareDeterministicContractReturnType,
    };

    //TODO: Refactor for more optional deployments, for now this is enough for type inference
    if (mailboxAddress) {
        //Deploy Hyperlane implementations if mailbox defined
        const hyperlaneImplementations = await prepareHyperlaneContracts(client, { mailboxAddress });
        if (hyperlaneImplementations.requests) requests.push(...hyperlaneImplementations.requests);

        result.hypErc20 = hyperlaneImplementations.hypErc20;
        result.hypErc20Fast = hyperlaneImplementations.hypErc20Fast;
        result.hypNative = hyperlaneImplementations.hypNative;
    }

    return result;
}

export interface SetupChainContractParameters {
    /** Paymaster signer */
    verifyingSignerAddress: Address;
    /** Hyperlane Mailbox */
    mailboxAddress?: Address;
}

/**
 * Setup network by deploying core contracts required by our infra. We try to only deployed contracts
 * that are required, and prefer to lazy-deploy any other implementations.
 * Shared
 *   - DeterministicDeployer (0x4e59b44847b379578588920cA78FbF26c0B4956C)
 *   - Create2Factory (0x62366409c9E4D9c7b255d6A8990320A6e4c29B17)
 *   - EntryPointV07  (0x0000000071727De22E5E9d8BAf0edAc6f37da032)
 *   - SimpleAccountFactory (0x91E60e0613810449d098b0b5Ec8b51A0FE8c8985)
 *   - Diamond contracts
 *   - Hyperlane implementations
 * Production / Staging
 *   - VerifyingPaymaster (TBD / 0x2e23ef1375aA642504bED97676A566F5A3E4ae5A)
 * @param client with accoutn and nonceManager
 * @param parameters paymaster signer address
 */
export async function setupChainContracts(
    client: Client<Transport, Chain, Account>,
    parameters: SetupChainContractParameters,
    apiUrl?: string,
    apiKey?: string,
) {
    if (!client.account.nonceManager) {
        throw new Error("client.account.nonceManager undefined");
    }
    const { verifyingSignerAddress } = parameters;

    //0. Deploy Deterministic Deployer
    const { hash } = await getOrDeployDeterministicDeployer(client);
    if (hash) {
        await getAction(client, waitForTransactionReceipt, "waitForTransactionReceipt")({ hash });
    }

    //1. Deploy contracts
    const contracts = await prepareChainContracts(client, parameters);

    // Check balance
    const contractsFee = contracts.requests.reduce(
        (acc, request) => acc + (request.gas ?? 0n) * (request.maxFeePerGas ?? request.gasPrice ?? 0n),
        0n,
    );

    if (contractsFee > 0n) {
        const balance = await getAction(client, getBalance, "getBalance")({ address: client.account.address });
        if (balance < contractsFee) {
            throw new Error(
                `Insufficient funds on ${client.account.address} ${formatEther(balance)} < ${formatEther(
                    contractsFee,
                )}`,
            );
        }
    }

    const transactions = await Promise.all(
        contracts.requests.map((request) => getAction(client, sendTransaction, "sendTransaction")(request as any)),
    );

    const receipts = await Promise.all(
        transactions.map((hash) => getAction(client, waitForTransactionReceipt, "waitForTransactionReceipt")({ hash })),
    );

    if (apiUrl && apiKey) {
        // TODO: decide if we want to do anything with the receipts. verifyAllContracts is more robust though
        // NOTE: for contracts with constructors or different default settings, this verification will fail
        // for (const receipt of receipts) {
        //     if (receipt.contractAddress) {
        //         const contractMetadata = getContractMetadata(receipt.contractAddress);
        //         if (contractMetadata) {
        //             await verifyContract({
        //                 apiUrl,
        //                 apiKey,
        //                 contractAddress: receipt.contractAddress as Address,
        //                 metadata: contractMetadata,
        //             });
        //         } else {
        //             console.warn(
        //                 `Skipping verification for contract at ${receipt.contractAddress} due to missing metadata.`,
        //             );
        //         }
        //     }
        // }
        const mailboxAddress = parameters.mailboxAddress ?? null;
        await verifyAllContracts(apiUrl, apiKey, mailboxAddress);
    } else {
        console.log("API URL or API Key not provided, skipping contract verification.");
    }

    //2. Deploy ERC4337 Paymaster (constructor requires EntryPoint deployment so need to wait for receipt)
    const verifyingPaymaster = await setupVerifyingPaymaster(client, { verifyingSignerAddress });
    if (verifyingPaymaster.hash) {
        await getAction(
            client,
            waitForTransactionReceipt,
            "waitForTransactionReceipt",
        )({ hash: verifyingPaymaster.hash });
    }

    return {
        ...contracts,
        verifyingPaymaster,
        transactions,
        receipts,
    };
}
