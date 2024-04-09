import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { addressZod, uint256Zod } from "@owlprotocol/zod-sol";
import { TypeOf, expectType } from "ts-expect";
import { z } from "zod";
import { Address } from "viem";
import { NetworkId } from "../Network.js";

/** ERC20Balance id components */
export interface ERC20BalanceId {
    readonly address: Address;
    readonly account: Address;
}
export const erc20BalanceIdRegex = /^(?<address>0x[a-fA-F0-9]{40})-(?<account>0x[a-fA-F0-9]{40})$/;
export const erc20BalanceIdZod = z
    .union([z.string().regex(erc20BalanceIdRegex), z.object({ address: addressZod, account: addressZod })])
    .transform((arg) => {
        if (typeof arg === "string") {
            return arg;
        } else {
            return `${arg.address}-${arg.account}`;
        }
    });
export const encodeERC20BalanceId: (id: string | ERC20BalanceId) => string = erc20BalanceIdZod.parse;
export const decodeERC20BalanceId: (id: string) => ERC20BalanceId = (id) =>
    erc20BalanceIdRegex.exec(id)!.groups! as unknown as ERC20BalanceId;

export interface ERC20BalanceData {
    readonly address: Address;
    readonly account: Address;
    readonly balance: string;
}
export const erc20BalanceDataZod = z.object({
    address: addressZod,
    account: addressZod,
    balance: uint256Zod,
});
export const encodeERC20BalanceData: (data: ERC20BalanceData) => ERC20BalanceData = erc20BalanceDataZod.parse;
export const encodeERC20BalanceDataPartial: (data: Partial<ERC20BalanceData>) => Partial<ERC20BalanceData> =
    erc20BalanceDataZod.partial().parse;

export type ERC20Balance = ERC20BalanceId & ERC20BalanceData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ERC20BalanceResource = FirebaseResource<FirestoreSDK, ERC20BalanceData, ERC20BalanceId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ERC20BalanceQueryResource = FirebaseQueryResource<FirestoreSDK, ERC20BalanceData, ERC20BalanceId>;
export type ERC20BalanceGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ERC20BalanceData,
    ERC20BalanceId,
    NetworkId,
    ERC20BalanceData,
    ERC20BalanceData,
    Query<FirestoreSDK, ERC20BalanceData>
>;

//Check zod validator matches interface
expectType<TypeOf<ERC20BalanceData, z.input<typeof erc20BalanceDataZod>>>(true);
expectType<TypeOf<ERC20BalanceData, z.output<typeof erc20BalanceDataZod>>>(true);
