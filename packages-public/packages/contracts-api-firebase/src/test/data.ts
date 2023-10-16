import { User } from "../models/users/User.js";
import { Project } from "../models/Project.js";
import { ProjectTemplate } from "../models/ProjectTemplate.js";

export const testNetworkId = "1337";

const uuid1 = "00000000-0000-0000-0000-000000000001";
const uuid2 = "00000000-0000-0000-0000-000000000002";
const uuid3 = "00000000-0000-0000-0000-000000000003";
const uuid4 = "00000000-0000-0000-0000-000000000004";
const uuid5 = "00000000-0000-0000-0000-000000000005";

export const testUserId = uuid1;

export const testUser: User = {
    id: testUserId,
    email: "johndoe@owlprotocol.xyz",
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
            native: "1000000000000000000",
        },
    },
};
export const testProjectTemplateId = uuid4;
export const testProjectTemplate: ProjectTemplate = {
    id: testProjectTemplateId,
    name: "NFT Collection",
    description: "Create digital assets connected to any API via Chainlink",
    imgUrl: "nft.svg",
};
export const testProjectId = uuid5;
export const testProject: Project = {
    id: testProjectId,
    name: "Test Project",
    owner: testUserId,
};
