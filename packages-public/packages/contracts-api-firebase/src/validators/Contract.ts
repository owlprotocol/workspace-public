import { addressZod } from "@owlprotocol/zod-sol";
import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import { deploymentMethodZod } from "./DeploymentMethod.js";
import { relayMethodZod } from "./RelayMethod.js";
import type { Contract } from "../models/Contract.js";

export const contractZod = z
    .object({
        id: z.string().describe("id"),
        /** Blockchain Data */
        networkId: z.string().describe("id of the network that the contract is deployed on"),
        address: addressZod.describe("address of the deployed contract"),
        contractTx: z.string().describe("contract deploy transaction").optional(),
        relay: relayMethodZod.optional(),
        contractParams: z.any().describe("contract deploy params").optional(),
        deployParams: z
            .object({
                msgSender: addressZod.describe("deploy message sender"),
                salt: z.string(),
                deploymentMethod: deploymentMethodZod,
                beaconAddress: addressZod.describe("beacon address").optional(),
            })
            .describe("deploy params")
            .optional(),
        /** User Data */
        owner: z.string().describe("owner's user id"),
        contractName: z.string().describe("name of the contract deployed"),
        projectId: z.string().describe("projectId").optional(),
    })
    .describe("contract");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//TODO: Typecheck fails on deployParams
//Check zod validator matches interface
type ContractZodInferred = Readonly<z.infer<typeof contractZod>>;
expectType<TypeEqual<Omit<Contract, "deployParams">, Omit<ContractZodInferred, "deployParams">>>(true);
