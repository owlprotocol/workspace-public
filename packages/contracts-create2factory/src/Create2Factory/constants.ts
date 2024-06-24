import { parseGwei, getCreateAddress, Address } from "viem";
import { PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER } from "@owlprotocol/envvars";

/**
 * Create2Factory address when deployed using DeterministicDeployer
 * 0x62366409c9E4D9c7b255d6A8990320A6e4c29B17
 **/
export const CREATE2_FACTORY_ADDRESS: Address = "0x62366409c9E4D9c7b255d6A8990320A6e4c29B17";

/** ETH transaction base gas cost */
export const ETH_TX_BASE_GAS = 21000n;
//464977n
/** Create2Factory presign gas limit */
export const CREATE2_FACTORY_PRESIGN_GAS_LIMIT = 600000n;
/** Create2Factory presign gas price */
export const CREATE2_FACTORY_PRESIGN_GAS_PRICE = parseGwei("100");
//0.0621 ETH
/** Create2Factory presign max eth cost */
export const CREATE2_FACTORY_PRESIGN_ETH_COST =
    CREATE2_FACTORY_PRESIGN_GAS_PRICE * (CREATE2_FACTORY_PRESIGN_GAS_LIMIT + ETH_TX_BASE_GAS);

//0xfcf1a16de45ab581b0117befb9416a4a86629629
/** Create2Factory address when deployed using pre-signed transction */
export const CREATE2_FACTORY_ADDRESS_PRESIGN = getCreateAddress({
    from: PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER as `0x${string}`,
    nonce: 0n,
});
