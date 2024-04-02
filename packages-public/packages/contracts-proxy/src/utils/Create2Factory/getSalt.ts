import { constants, utils } from "ethers";

export const DEFAULT_SALT = utils.hexZeroPad(utils.hexlify(1), 32);
export const DEFAULT_MSG_SENDER = constants.AddressZero;
export const DEFAULT_INIT_DATA = "0x";

export interface SaltArgs {
    salt?: string;
    msgSender?: string;
    initData?: string;
}
export function getSalt(saltArgs?: Partial<SaltArgs>) {
    const { salt = DEFAULT_SALT, msgSender = DEFAULT_MSG_SENDER, initData = DEFAULT_INIT_DATA } = saltArgs ?? {};

    const data = utils.defaultAbiCoder.encode(["bytes32", "address", "bytes"], [salt, msgSender, initData]);
    return utils.keccak256(data);
}
