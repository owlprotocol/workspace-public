import { utils } from "ethers";
import { SafeTransactionData } from "../types/SafeTransaction.js";

// keccak256(
//     "EIP712Domain(uint256 chainId,address verifyingContract)"
// );
const DOMAIN_SEPARATOR_TYPE_HASH = "0x47e79534a245952e8b16893a336b85a3d9ea9fa8c573f3d803afb92a79469218";

// keccak256(
//     "SafeTx(address to,uint256 value,bytes data,uint8 operation,uint256 safeTxGas,uint256 baseGas,uint256 gasPrice,address gasToken,address refundReceiver,uint256 nonce)"
// );
const SAFE_TX_TYPEHASH = "0xbb8310d486368db6bd6f849402fdd73ad53d316b5a4b2644ad6efe0f941286d8";

/**
 * TS implementation of Safe.domainSeparator()
 * @dev Returns the domain separator for this contract, as defined in the EIP-712 standard.
 * @param chainId
 * @param verifyingContract Safe contract address
 * @returns The domain separator hash
 */
export function domainSeparator(chainId: string, verifyingContract: string) {
    return utils.defaultAbiCoder.encode(
        ["bytes32", "uint256", "address"],
        [DOMAIN_SEPARATOR_TYPE_HASH, chainId, verifyingContract],
    );
}

/**
 * TS implementation of Safe.encodeTransactionData()
 * @dev Returns the pre-image of the transaction hash (see getTransactionHash).
 * @param chainId
 * @param verifyingContract Safe contract address
 * @return Transaction hash bytes
 */
export function encodeTransactionData(chainId: string, verifyingContract: string, tx: SafeTransactionData) {
    const { to, value, data, operation, safeTxGas, baseGas, gasPrice, gasToken, refundReceiver, nonce } = tx;
    const domain = domainSeparator(chainId, verifyingContract);
    const safeTxHash = utils.keccak256(
        utils.defaultAbiCoder.encode(
            [
                "bytes32",
                "address",
                "uint256",
                "bytes32",
                "uint8",
                "uint256",
                "uint256",
                "uint256",
                "address",
                "address",
                "uint256",
            ],
            [
                SAFE_TX_TYPEHASH,
                to,
                value,
                utils.keccak256(data),
                operation,
                safeTxGas,
                baseGas,
                gasPrice,
                gasToken,
                refundReceiver,
                nonce,
            ],
        ),
    );

    return utils.solidityPack(["bytes1", "bytes1", "bytes32", "bytes32"], ["0x19", "0x1", domain, safeTxHash]);
}

/**
 * TS implementation of Safe.getTransactionHash()
 * Used for on-chain signatures
 * @dev Returns transaction hash to be signed by owners.
 * @param chainId
 * @param verifyingContract Safe contract address
 * @return Transaction hash
 */
export function getTransactionHash(chainId: string, verifyingContract: string, tx: SafeTransactionData) {
    return utils.keccak256(encodeTransactionData(chainId, verifyingContract, tx));
}
