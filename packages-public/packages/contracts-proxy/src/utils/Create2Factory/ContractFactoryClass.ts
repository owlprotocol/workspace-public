import type { BaseContract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

/**
 * Typechain Factory class interface
 */
export interface ContractFactoryClass<C extends BaseContract = BaseContract> {
    connect(address: string, signerOrProvider: Signer | Provider): C;
    createInterface(): C["interface"];
    bytecode: string;
}
