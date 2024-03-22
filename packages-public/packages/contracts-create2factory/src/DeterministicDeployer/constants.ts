import { Address, Hex, parseGwei } from "viem";

export const DETERMINISTIC_DEPLOYER_ADDRESS: Address = "0x4e59b44847b379578588920ca78fbf26c0b4956c";

export const deploySignerAddress: Address = "0x3fab184622dc19b6109349b94811493bf2a45362";
export const deployGasPrice: bigint = parseGwei("100");
export const deployGasLimit = 100000n;
export const deployEthCost = deployGasLimit * deployGasPrice;
export const deployTransaction: Hex =
    "0xf8a58085174876e800830186a08080b853604580600e600039806000f350fe7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe03601600081602082378035828234f58015156039578182fd5b8082525050506014600cf31ba02222222222222222222222222222222222222222222222222222222222222222a02222222222222222222222222222222222222222222222222222222222222222";
