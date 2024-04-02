import { utils } from "ethers";
import { PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER } from "@owlprotocol/envvars";

//0xfcf1a16de45ab581b0117befb9416a4a86629629
export const CREATE2_FACTORY_ADDRESS = utils.getContractAddress({
    from: PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER,
    nonce: 0,
});
