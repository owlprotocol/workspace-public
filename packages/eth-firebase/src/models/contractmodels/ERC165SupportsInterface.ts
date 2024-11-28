import {
    FirestoreSDK,
    FirebaseQueryResource,
    Query,
    FirebaseResource,
    FieldOverridesSchema,
} from "@owlprotocol/crud-firebase";
import { addressZod, bytes4Zod } from "@owlprotocol/zod-sol";
import { z } from "zod";
import { Address, Hex } from "viem";
import { expectType, TypeOf } from "ts-expect";
import { NetworkId } from "../Network.js";

export interface ERC165SupportsInterfaceId {
    readonly address: Address;
    readonly interfaceId: Hex;
}

export const erc165SupportsInterfaceIdZod = z
    .object({
        address: addressZod,
        interfaceId: bytes4Zod,
    })
    .transform(({ address, interfaceId }) => `${address}-${interfaceId}`);
export const encodeERC165SupportsInterfaceId: (id: string | ERC165SupportsInterfaceId) => string =
    erc165SupportsInterfaceIdZod.parse;

export const erc165SupportsInterfaceIdRegex = /^(?<address>0x[a-fA-F0-9]{40})-(?<interfaceId>0x[a-fA-F0-9]{8})$/;
export const decodeERC165SupportsInterfaceId: (id: string) => ERC165SupportsInterfaceId = (id) =>
    erc165SupportsInterfaceIdRegex.exec(id)!.groups! as unknown as ERC165SupportsInterfaceId;

/**
 * Cached ERC165 support data. Store last known support status.
 */
export interface ERC165SupportsInterfaceInput {
    readonly address: Address;
    readonly interfaceId: Hex;
    supported: boolean;
}

/**
 * Encoded ERC165 support data for Firebase.
 */
export interface ERC165SupportsInterfaceEncoded {
    readonly address: Address;
    readonly interfaceId: Hex;
    supported: boolean;
}

/**
 * Decoded ERC165 support data from Firebase.
 */
export interface ERC165SupportsInterfaceDecoded {
    readonly address: Address;
    readonly interfaceId: Hex;
    supported: boolean;
}

export const erc165SupportsInterfaceEncodeZod = z.object({
    address: addressZod,
    interfaceId: bytes4Zod,
    supported: z.boolean(),
});

export const erc165SupportsInterfaceDecodeZod = z.object({
    address: addressZod,
    interfaceId: bytes4Zod,
    supported: z.boolean(),
});

export const encodeERC165SupportsInterfaceData: (data: ERC165SupportsInterfaceInput) => ERC165SupportsInterfaceEncoded =
    erc165SupportsInterfaceEncodeZod.parse;

export const encodeERC165SupportsInterfaceDataPartial: (
    data: Partial<ERC165SupportsInterfaceInput>,
) => Partial<ERC165SupportsInterfaceEncoded> = erc165SupportsInterfaceEncodeZod.partial().parse;

export const decodeERC165SupportsInterfaceData: (
    data: ERC165SupportsInterfaceEncoded,
) => ERC165SupportsInterfaceDecoded = erc165SupportsInterfaceDecodeZod.parse;

// Type Assertions
expectType<TypeOf<z.input<typeof erc165SupportsInterfaceEncodeZod>, ERC165SupportsInterfaceInput>>(true);
expectType<TypeOf<z.output<typeof erc165SupportsInterfaceEncodeZod>, ERC165SupportsInterfaceEncoded>>(true);
expectType<TypeOf<z.input<typeof erc165SupportsInterfaceDecodeZod>, ERC165SupportsInterfaceEncoded>>(true);
expectType<TypeOf<z.output<typeof erc165SupportsInterfaceDecodeZod>, ERC165SupportsInterfaceDecoded>>(true);

export type ERC165SupportsInterface = ERC165SupportsInterfaceId & ERC165SupportsInterfaceInput;

//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ERC165SupportsInterfaceResource = FirebaseResource<
    FirestoreSDK,
    ERC165SupportsInterfaceDecoded,
    ERC165SupportsInterfaceId,
    NetworkId,
    ERC165SupportsInterfaceInput,
    ERC165SupportsInterfaceEncoded
>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ERC165SupportsInterfaceQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ERC165SupportsInterfaceDecoded,
    ERC165SupportsInterfaceId,
    NetworkId,
    ERC165SupportsInterfaceInput,
    ERC165SupportsInterfaceEncoded
>;

export type ERC165SupportsInterfaceGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ERC165SupportsInterfaceDecoded,
    ERC165SupportsInterfaceId,
    NetworkId,
    ERC165SupportsInterfaceInput,
    ERC165SupportsInterfaceEncoded,
    Query<FirestoreSDK, ERC165SupportsInterfaceEncoded>
>;

// Field overrides for Firestore
export const ERC165SupportsInterfaceFieldOverrides: FieldOverridesSchema<keyof ERC165SupportsInterfaceInput> = {
    address: "COLLECTION_GROUP",
    interfaceId: "COLLECTION_GROUP",
    supported: "IGNORE",
};
