import { parseGwei, getCreateAddress, Address } from "viem";
import { PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER } from "@owlprotocol/envvars";

//WARNING Change if bytecode every changes
/** Create2Factory address when deployed using DeterministicDeployer */
export const CREATE2_FACTORY_ADDRESS: Address = "0x1E76c4Efca7b55fA44838E1Cf54507B999c7AF11";

//getCreate2Address({
//    from: DETERMINISTIC_DEPLOYER_ADDRESS,
//    salt: zeroHash,
//    bytecode: Create2Factory.bytecode,
//});

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
