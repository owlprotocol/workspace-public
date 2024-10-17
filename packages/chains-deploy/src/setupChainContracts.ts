import { Account, Address, Chain, Client, TransactionRequest, Transport } from "viem";
import { setupERC4337Contracts, setupVerifyingPaymaster } from "@owlprotocol/contracts-account-abstraction";
import { getOrPrepareCreate2Factory } from "@owlprotocol/contracts-create2factory";
import { prepareDiamondFacets, prepareERC721Facets, prepareCoreContractFacets } from "@owlprotocol/contracts-diamond";
import { getAction } from "viem/utils";
import { sendTransaction, waitForTransactionReceipt } from "viem/actions";

/**
 * Setup network by deploying core contracts required by our infra. We try to only deployed contracts
 * that are required, and prefer to lazy-deploy any other implementations.
 * Shared
 *   - DeterministicDeployer (0x4e59b44847b379578588920cA78FbF26c0B4956C)
 *   - Create2Factory (0x62366409c9E4D9c7b255d6A8990320A6e4c29B17)
 *   - EntryPointV07  (0x0000000071727De22E5E9d8BAf0edAc6f37da032)
 *   - SimpleAccountFactory (0x91E60e0613810449d098b0b5Ec8b51A0FE8c8985)
 * Production / Staging
 *   - VerifyingPaymaster (TBD / 0x2e23ef1375aA642504bED97676A566F5A3E4ae5A)
 *   - Diamond contracts
 */
export async function setupChainContracts(
    client: Client<Transport, Chain, Account>,
    parameters: {
        verifyingSignerAddress: Address;
    },
) {
    const { verifyingSignerAddress } = parameters;
    const requests: TransactionRequest[] = [];

    //1. Deploy ERC4337 contracts (+ Arachnid deployer)
    const erc4337Contracts = await setupERC4337Contracts(client);
    //2. Deploy ERC4337 Paymaster
    const verifyingPaymaster = await setupVerifyingPaymaster(client, { verifyingSignerAddress });
    //3. Deploy Create2Factory
    const create2Factory = await getOrPrepareCreate2Factory(client);
    if (create2Factory.request) {
        requests.push(create2Factory.request);
    }

    //4. Deploy Implementations
    //Deploy Diamond facets
    const diamondFacets = await prepareDiamondFacets(client);
    //Deploy Core facets
    const coreFacets = await prepareCoreContractFacets(client);
    //Deploy ERC721 facets
    const erc721Facets = await prepareERC721Facets(client);
    requests.push(...diamondFacets.requests, ...coreFacets.requests, ...erc721Facets.requests);

    const transactions = await Promise.all(
        requests.map((request) => getAction(client, sendTransaction, "sendTransaction")(request as any)),
    );

    await Promise.all(
        transactions.map((hash) => getAction(client, waitForTransactionReceipt, "waitForTransactionReceipt")({ hash })),
    );

    return {
        ...erc4337Contracts,
        ...diamondFacets,
        ...coreFacets,
        ...erc721Facets,
        create2Factory,
        verifyingPaymaster,
    };
}
