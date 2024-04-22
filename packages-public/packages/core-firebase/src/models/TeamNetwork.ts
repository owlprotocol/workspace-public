import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import { FieldOverridesSchema } from "@owlprotocol/crud-firebase";
import { Network, networkZodInternal } from "./Network.js";

/**
 * TeamNetwork config, similar to Network bot for teams
 */
export type TeamNetwork = Network;

// Define Zod schema for TeamNetwork
const teamNetworkZodInternal = networkZodInternal;

export const encodeTeamNetwork: (data: TeamNetwork) => TeamNetwork = teamNetworkZodInternal.parse;
export const encodeTeamNetworkPartial: (data: Partial<TeamNetwork>) => Partial<TeamNetwork> =
    teamNetworkZodInternal.partial().parse;

//Fix Zod vs TS types for TeamNetwork
export const teamNetworkZod = teamNetworkZodInternal as Omit<typeof teamNetworkZodInternal, "_output" | "_input"> & {
    _input: TeamNetwork;
    _output: TeamNetwork;
};

// Validation with TS types
expectType<TypeEqual<TeamNetwork, z.input<typeof teamNetworkZod>>>(true);
expectType<TypeEqual<TeamNetwork, z.output<typeof teamNetworkZod>>>(true);

//TODO: Setup for full keys
export const TeamNetworkFieldOverrides: FieldOverridesSchema<"chainId"> = {
    chainId: "COLLECTION_GROUP",
};
