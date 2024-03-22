import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-viem";
import "solidity-docgen";
import "hardhat-deploy";

import hhConfigDefault from "@owlprotocol/hardhat-config";

const hhConfig = { ...hhConfigDefault } as HardhatUserConfig;
//Increase optimization
//@ts-expect-error
hhConfig.solidity.settings.optimizer.runs = 100000;

export default hhConfig;
