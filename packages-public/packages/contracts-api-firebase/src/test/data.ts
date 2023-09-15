import { ethers } from "ethers";
import { PRIVATE_KEY_0_LOCAL } from "@owlprotocol/envvars";
import * as crypto from "crypto";
import { User } from "../models/User.js";
import { Project } from "../models/Project.js";
import { ProjectTemplate } from "../models/ProjectTemplate.js";

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
export const testProjectTemplateId = uuid1;
export const testProjectTemplate: ProjectTemplate = {
    templateId: testProjectTemplateId,
    templateName: "NFT Collection",
};
export const testProjectId = crypto.randomUUID();
export const testProject: Project = {
    projectId: testProjectId,
    projectName: "Test Project",
    userId: testUserId,
};
