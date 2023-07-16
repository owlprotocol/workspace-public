import { mapValues } from "../lodash.js";
import * as contracts from "../typechain/ethers/factories/contracts/index.js";
import { abiWithFunctionsOnly, abiWithZod } from "@owlprotocol/zod-sol";

export const abis = {
    BeaconProxy: contracts.erc1167.ERC1167Factory__factory.abi,
    UpgradeableBeacon: contracts.beacon.UpgradeableBeacon__factory.abi
} as const

const abisFunctions = mapValues(abis, (abi) => {
    return abiWithFunctionsOnly(abi)
}) as {
        [K in keyof typeof abis]: ReturnType<typeof abiWithFunctionsOnly<typeof abis[K]>>
    }

export const abisWithZod = mapValues(abisFunctions, (abi) => {
    return abiWithZod(abi)
}) as {
        [K in keyof typeof abisFunctions]: ReturnType<typeof abiWithZod<typeof abisFunctions[K]>>
    }
