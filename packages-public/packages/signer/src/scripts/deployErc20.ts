import { API_TRPC_BASE_URL } from "@owlprotocol/envvars";
import { ethers } from "ethers";
import { CREATE2_FACTORY_ADDRESS, TypechainEthers } from "@owlprotocol/contracts-proxy";
import { ZodValidators } from "@owlprotocol/contracts-api/factories";
import { ERC20Mintable__factory__create2 } from "@owlprotocol/contracts/factories";
import { IERC20Mintable } from "@owlprotocol/contracts/ethers/factoryInterfaceClasses";
import { OwlSigner } from "../OwlSigner.js";
import { OwlProvider } from "../OwlProvider.js";

export async function deployERC20() {
    // 0. Create Owl Signer (API_KEY required)
    const { API_KEY } = process.env;
    if (!API_KEY) throw new Error(`API_KEY ${API_KEY}! Get API_KEY by signing up and adding it to .env file`);

    const txWait = 1;
    const provider = new OwlProvider(1337, API_TRPC_BASE_URL);
    const signer = new OwlSigner({ apiKey: API_KEY }, API_TRPC_BASE_URL, txWait, provider);

    // 1. Deploy ERC20Mintable contract
    // NOTE: We need to craft the deploy transaction
    const contractName = "ERC20Mintable";
    const methodName = "initialize";
    const erc20InputsDefinedArrayify = ZodValidators[contractName][methodName].inputsDefinedArrayify;

    const userSafeAddress = await signer.getAddress();
    // Default msgSender & admin
    const msgSender = userSafeAddress;

    const contractParams = {
        admin: userSafeAddress,
        name: "My ERC20",
        symbol: "MY",
        contractUri: "",
    };

    const salt = "0x" + Buffer.from(ethers.utils.randomBytes(32)).toString("hex");

    const initArgs = erc20InputsDefinedArrayify.parse(contractParams);

    const Create2FactoryInterface = TypechainEthers.ICreate2Factory__factory.createInterface();
    const contractCodeDataInitData = ERC20Mintable__factory__create2.getDeployCodeDataInitData(initArgs);

    const data = Create2FactoryInterface.encodeFunctionData("deployDeterministic", [
        salt,
        msgSender,
        [contractCodeDataInitData.codeData],
        [contractCodeDataInitData.initData],
    ]);

    const result = await signer.sendTransaction({ data, to: CREATE2_FACTORY_ADDRESS });

    const contractAddress = ERC20Mintable__factory__create2.getDeployAddress(initArgs, { msgSender, salt });

    // 2. Mint token
    const contract = IERC20Mintable.connect(contractAddress, signer);

    const receiver = userSafeAddress;
    const mint = await contract.mint(receiver, 100);

    return { contractAddress, deployHash: result.hash, mint };
}

async function main() {
    const result = await deployERC20();
    console.debug(result);
}

main().then(() => {
    return {};
});
