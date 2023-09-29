import { utils } from "ethers";
import { PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER } from "@owlprotocol/envvars";

export const CREATE2_FACTORY_ADDRESS = utils.getContractAddress({
    from: PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER,
    nonce: 0,
});
