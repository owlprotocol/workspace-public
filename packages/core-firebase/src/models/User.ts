import { FirebaseQueryResource, FirebaseResource, FirestoreSDK } from "@owlprotocol/crud-firebase";
import { TypeOf, expectType } from "ts-expect";
import { z } from "zod";

export interface UserId {
    userId: string;
}
export const userIdZod = z
    .union([z.string(), z.object({ userId: z.string() })])
    .transform((arg) => (typeof arg === "string" ? arg : arg.userId));
export const encodeUserId: (id: string | UserId) => string = userIdZod.parse;
export const decodeUserId: (id: string) => Required<UserId> = (id) => {
    return { userId: id };
};

export interface UserData {
    readonly email: string;
    unverified?: boolean;
}
export const userDataZod = z
    .object({
        email: z.string().email().describe("email"),
        unverified: z.boolean().optional(),
    })
    .describe("user");
export const encodeUserData: (data: UserData) => UserData = userDataZod.parse;
export const encodeUserDataPartial: (data: Partial<UserData>) => Partial<UserData> = userDataZod.partial().parse;

export const userZod = userDataZod.extend({ userId: z.string().describe("user id") });

export type User = Required<UserId> & UserData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type UserResource = FirebaseResource<FirestoreSDK, UserData, UserId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type UserQueryResource = FirebaseQueryResource<FirestoreSDK, UserData, UserId>;

//Check zod validator matches interface
expectType<TypeOf<UserData, z.input<typeof userDataZod>>>(true);
expectType<TypeOf<UserData, z.output<typeof userDataZod>>>(true);
