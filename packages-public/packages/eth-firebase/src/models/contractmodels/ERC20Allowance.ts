import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { addressZod, uint256Zod } from "@owlprotocol/zod-sol";
import { expectType, TypeOf } from "ts-expect";
import { z } from "zod";
import { Address } from "viem";
import { NetworkId } from "../Network.js";

/** ERC20Allowance id components */
export interface ERC20AllowanceId {
    readonly address: Address;
    readonly account: Address;
    readonly spender: Address;
}
export const erc20AllowanceIdRegex =
    /^(?<address>0x[a-fA-F0-9]{40})-(?<account>0x[a-fA-F0-9]{40})-(?<spender>0x[a-fA-F0-9]{40})$/;
export const erc20AllowanceIdZod = z
    .union([
        z.string().regex(erc20AllowanceIdRegex),
        z.object({ address: addressZod, account: addressZod, spender: addressZod }),
    ])
    .transform((arg) => {
        if (typeof arg === "string") {
            return arg;
        } else {
            return `${arg.address}-${arg.account}-${arg.spender}`;
        }
    });
export const encodeERC20AllowanceId: (id: string | ERC20AllowanceId) => string = erc20AllowanceIdZod.parse;
export const decodeERC20AllowanceId: (id: string) => ERC20AllowanceId = (id) =>
    erc20AllowanceIdRegex.exec(id)!.groups! as unknown as ERC20AllowanceId;

export interface ERC20AllowanceData {
    readonly address: Address;
    readonly account: Address;
    readonly spender: Address;
    readonly balance: string;
}
export const erc20AllowanceDataZod = z.object({
    address: addressZod,
    account: addressZod,
    spender: addressZod,
    balance: uint256Zod,
});
export const encodeERC20AllowanceData: (data: ERC20AllowanceData) => ERC20AllowanceData = erc20AllowanceDataZod.parse;
export const encodeERC20AllowanceDataPartial: (data: Partial<ERC20AllowanceData>) => Partial<ERC20AllowanceData> =
    erc20AllowanceDataZod.partial().parse;

export type ERC20Allowance = ERC20AllowanceId & ERC20AllowanceData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ERC20AllowanceResource = FirebaseResource<FirestoreSDK, ERC20AllowanceData, ERC20AllowanceId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ERC20AllowanceQueryResource = FirebaseQueryResource<FirestoreSDK, ERC20AllowanceData, ERC20AllowanceId>;
export type ERC20AllowanceGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ERC20AllowanceData,
    ERC20AllowanceId,
    NetworkId,
    ERC20AllowanceData,
    ERC20AllowanceData,
    Query<FirestoreSDK, ERC20AllowanceData>
>;

//Check zod validator matches interface
expectType<TypeOf<ERC20AllowanceData, z.input<typeof erc20AllowanceDataZod>>>(true);
expectType<TypeOf<ERC20AllowanceData, z.output<typeof erc20AllowanceDataZod>>>(true);
