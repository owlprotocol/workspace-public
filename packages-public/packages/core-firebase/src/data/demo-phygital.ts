/**
 * Demo - Gaming Data
 *
 * This file contains all the raw static data for a specific demo
 *
 * Data is used by `admin/controllers/projectDemo.ts` to create the final models without IDs for core-trpc's teamProjectDemoCreate
 */

// import { randomUUID } from "crypto";
// import { projectUserResource } from "../admin/resources.js";
import { ProjectUser } from "../models/index.js";
import { getRandomExternalId } from "../utils/randomExternalId.js";

// project
export const projectName = "Digital Items and Phygitals Demo";
export const projectDesc =
    "Create digital twins of your real world items. Easily integrate your E-Commerce, PoS, or merchandise platform to trigger digital item creation on purchase or any other event.";

export const projectCoverImage = "/demo/events-cover.png";

// network
export const chainId = 130130;

// project user - we don't create Clerk users for them so userId is fake
export const projectUsers: Omit<ProjectUser, "userId">[] = [
    {
        email: "gamer.john.777@example.com",
        fullName: "John Smith",
        externalId: getRandomExternalId(),
    },
    {
        email: "mary.jane@example.com",
        fullName: "Mary Jane",
        externalId: getRandomExternalId(),
    },
    {
        email: "j.potter@example.com",
        fullName: "Joseph Potter",
        externalId: getRandomExternalId(),
    },
];

/*
export function uploadDemoData(projectId: string) {
    return Promise.all([
        projectUserResource.setBatch(
            projectUsers.map((e) => {
                return { projectId: projectId, ...e };
            }),
        ),
    ]);
}
*/

export const dataDemoPhygital = {
    projectName,
    projectDesc,
    projectCoverImage,
    chainId,
    projectUsers,
};
