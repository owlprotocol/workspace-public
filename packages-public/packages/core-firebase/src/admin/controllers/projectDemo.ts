// import { createProject } from "./project.js";
import { OWL_TESTNET_NETWORK_ID } from "@owlprotocol/envvars";
import { projectResource } from "../resources.js";

// import { Address, Hash } from "viem";

import { Project, ProjectDemoType, ProjectType } from "../../models/index.js";

import { dataDemoGaming } from "../../data/demo-gaming.js";
import { dataDemoEvents } from "../../data/demo-events.js";
// import { dataDemoPhygital } from "../../data/demo-phygital.js";

import { ProjectDemoData } from "../../data/index-demo.js";

export async function getProjectDemo({ teamId, demoType }: { teamId: string; demoType: ProjectDemoType }): Promise<{
    projectDemo: Omit<Project, "projectId">;
}> {
    let demoStaticData: ProjectDemoData;

    switch (demoType) {
        case ProjectDemoType.EVENT:
            demoStaticData = dataDemoEvents;
            break;

        case ProjectDemoType.GAMING:
            demoStaticData = dataDemoGaming;
            break;

        // case ProjectDemoType.PHYGITAL:
        //     demoStaticData = dataDemoPhygital;
        //     break;

        default:
            throw new Error(`Demo Project Type: ${demoType} not found`);
    }

    const { project } = demoStaticData;

    const teamProjects = await projectResource.getWhere({ teamId });

    const demoNum = teamProjects.length + 1;

    const projectDemo: Omit<Project, "projectId"> = {
        teamId,
        name: `${project.name} ${demoNum}`,
        description: project.description,
        coverImage: project.coverImage,
        slug: `project-demo-${demoType}-${demoNum}`,
        defaultChainId: parseInt(OWL_TESTNET_NETWORK_ID),
        projectType: ProjectType.DEMO,
    };

    return {
        projectDemo,
    };
}
