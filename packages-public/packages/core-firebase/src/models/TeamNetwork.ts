import { FieldOverridesSchema } from "@owlprotocol/crud-firebase";
import { Network, networkDataZod, encodeNetworkData, encodeNetworkDataPartial } from "./Network.js";

/**
 * TeamNetwork config, similar to Network bot for teams
 */
export type TeamNetwork = Network;

export const encodeTeamNetwork: (data: TeamNetwork) => TeamNetwork = encodeNetworkData;
export const encodeTeamNetworkPartial: (data: Partial<TeamNetwork>) => Partial<TeamNetwork> = encodeNetworkDataPartial;

//Fix Zod vs TS types for TeamNetwork
export const teamNetworkZod = networkDataZod;

//TODO: Setup for full keys
export const TeamNetworkFieldOverrides: FieldOverridesSchema<"chainId"> = {
    chainId: "COLLECTION_GROUP",
};
