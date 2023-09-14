import { ethers } from "ethers";
import { PRIVATE_KEY_0_LOCAL } from "@owlprotocol/envvars";
import { User } from "../models/User.js";
import { Template } from "../models/Template.js";

export const testNetworkId = "31337";
export const testSigner = new ethers.Wallet(PRIVATE_KEY_0_LOCAL);

const uuid1 = "00000000-0000-0000-0000-000000000001";
const uuid2 = "00000000-0000-0000-0000-000000000002";
const uuid3 = "00000000-0000-0000-0000-000000000003";

export const testNetwork = {
    name: "localhost",
    config: { chainId: parseInt(testNetworkId), accounts: [testSigner._signingKey().privateKey] },
};
export const testUserId = uuid1;
export const testUser: User = {
    email: "johndoe@gmail.com",
    apiKey: uuid2,
    dfnsId: uuid3,
    gnosisAddress: {},
    topupTotals: {
        [testNetworkId]: {
            native: "0",
        },
    },
    topupMax: {
        [testNetworkId]: {
            native: ethers.utils.parseUnits("1").toString(),
        },
    },
};
export const testTemplateId = uuid1;
export const testTemplate: Template = {
    templateId: testTemplateId,
    templateName: "NFT Collection",
};
