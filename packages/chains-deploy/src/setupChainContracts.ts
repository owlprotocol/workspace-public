import { Address } from "viem";
import { Clients } from "@owlprotocol/viem-utils";
import { setupERC4337Contracts, setupVerifyingPaymaster } from "@owlprotocol/contracts-account-abstraction";
import { getOrDeployCreate2Factory } from "@owlprotocol/contracts-create2factory";
import { getERC721ImplementationDeployParams } from "@owlprotocol/contracts-diamond";

/**
 * Params to setup network
 */
export interface SetupChainContractsParams extends Clients {
    verifyingSignerAddress: Address;
}

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
export async function setupChainContracts(params: SetupChainContractsParams) {
    const { publicClient, walletClient, verifyingSignerAddress } = params;

    //1. Deploy ERC4337 contracts (+ Arachnid deployer)
    const erc4337Contracts = await setupERC4337Contracts({ publicClient, walletClient });
    //2. Deploy ERC4337 Paymaster
    const verifyingPaymaster = await setupVerifyingPaymaster({ publicClient, walletClient, verifyingSignerAddress });
    //3. Deploy Create2Factory
    const create2Factory = await getOrDeployCreate2Factory({
        publicClient,
        walletClient,
    });
    if (create2Factory.hash) {
        await publicClient.waitForTransactionReceipt({ hash: create2Factory.hash });
    }

    //4. Deploy ERC721 Implementations
    const erc721Implementations = await getERC721ImplementationDeployParams({ publicClient });
    if (erc721Implementations.deployTransaction) {
        const hash = await walletClient.sendTransaction(erc721Implementations.deployTransaction);
        await publicClient.waitForTransactionReceipt({ hash });
    }

    return {
        ...erc4337Contracts,
        create2Factory,
        verifyingPaymaster,
        erc721Implementations,
    };
}
