import { FieldOverridesSchema } from "@owlprotocol/crud-firebase";
import { Network, networkDataEncodeZod } from "./Network.js";

//Alias for team network config
export type TeamNetwork = Network;

//Fix Zod vs TS types for TeamNetwork
export const teamNetworkZod = networkDataEncodeZod;

//TODO: Setup for full keys
export const TeamNetworkFieldOverrides: FieldOverridesSchema<"chainId"> = {
    chainId: "COLLECTION_GROUP",
};
