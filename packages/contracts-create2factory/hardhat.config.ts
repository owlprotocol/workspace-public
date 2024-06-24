import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-viem";
import "solidity-docgen";
import "hardhat-deploy";

import hhConfigDefault from "@owlprotocol/hardhat-config";

const hhConfig = { ...hhConfigDefault } as HardhatUserConfig;

export default hhConfig;
