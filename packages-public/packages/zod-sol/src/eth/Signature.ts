import { z } from "zod";
import { expectType, TypeEqual } from "ts-expect";
import { numberLikeToHexStringZod, numberLikeToNumberZod } from "./math.js";
import { bytesZod } from "../solidity/bytes.js";
import { NumberBigintAsString } from "../utils/NumberBigintAsString.js";

export const signatureComponentsZod = z.object({
    r: bytesZod.describe("signature r"),
    s: bytesZod.describe("signature s"),
    v: numberLikeToNumberZod.describe("signature r, recovery identifier"),
});
export const signatureZod = z.union([signatureComponentsZod, bytesZod]);
expectType<TypeEqual<SignatureComponents, z.output<typeof signatureComponentsZod>>>(true);
expectType<TypeEqual<Signature, z.output<typeof signatureZod>>>(true);

export const signatureComponentsFromRpcZod = signatureComponentsZod.extend({
    v: numberLikeToHexStringZod.describe("signature r, recovery identifier"),
});
expectType<TypeEqual<SignatureFromRpc, z.output<typeof signatureComponentsFromRpcZod>>>(true);

export type SignatureComponents = {
    r: string;
    s: string;
    v: number;
};
export type Signature = SignatureComponents | string;

export type SignatureFromRpc = NumberBigintAsString<SignatureComponents>;

/**
 *  A SignatureLike
 *
 *  @_docloc: api/crypto:Signing
 */
//TODO: Match original ethers type?
/*
export type Signature =
    | string
    | {
          r: string;
          s: string;
          v: number;
          yParity?: 0 | 1;
          yParityAndS?: string;
      }
    | {
          r: string;
          yParityAndS: string;
          yParity?: 0 | 1;
          s?: string;
          v?: number;
      }
    | {
          r: string;
          s: string;
          yParity: 0 | 1;
          v?: number;
          yParityAndS?: string;
      };
*/
