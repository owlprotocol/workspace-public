import { ethBytecodeResource } from "@owlprotocol/eth-firebase/admin";
import { EIP1193Parameters, EIP1193RequestFn, Hex, hexToNumber, keccak256, PublicRpcSchema } from "viem";
import { isBlockTag } from "../controllers/isBlockTag.js";

export async function requestCode(
    request: EIP1193RequestFn<PublicRpcSchema>,
    args: EIP1193Parameters<PublicRpcSchema> & { method: "eth_getCode" },
    options?: any,
) {
    const chainId = hexToNumber(await request({ method: "eth_chainId" }));
    const [address, blockTagOrNumber] = args.params;

    //TODO: More caching options?
    if (blockTagOrNumber != "latest") {
        return request(args, options);
    }

    const codeIndexed = await ethBytecodeResource.getOrNull({ chainId, address });
    if (codeIndexed) {
        // Bytecode cached
        //TODO: Fix this. Inconsistent behaviour as returning bytecode hash instead of bytecode
        //We store bytecodeHash as it is much more compact then storing full bytecode
        //Main use case for eth_getCode is to check if contract exists
        return codeIndexed.bytecodeHash;
    }

    const codeRpc = await request(args, options);

    if (codeRpc) {
        let blockNumberCache: Hex;
        if (isBlockTag(blockTagOrNumber)) {
            blockNumberCache = await request({ method: "eth_blockNumber" });
        } else {
            blockNumberCache = blockTagOrNumber;
        }

        if (codeRpc != "0x") {
            //Non empty-result, update cached earliers block
            //TODO: Seems like need to await for write to confirm?
            await ethBytecodeResource.upsert({
                chainId,
                address,
                blockNumber: blockNumberCache,
                bytecodeHash: keccak256(codeRpc),
            });
        }
    }
    return codeRpc;
}
