import { pick } from "lodash-es";
import { dataDemoGaming } from "./demo-gaming.js";
import { dataDemoEvents } from "./demo-events.js";
import { ProjectData, ProjectDemoType, ProjectUser, ProjectTokenTemplateData } from "../models/index.js";

// TODO: try to better reuse models, find a balance between intermediate data types and our actual models
export interface Collection {
    contractAddress?: `0x${string}`;
    name: string;
    symbol: string;

    // non-standard
    contractImageUrlOverride: string;
    itemTypes: Array<ProjectTokenTemplateData>;
}

export interface ProjectDemoData {
    project: Pick<ProjectData, "name" | "description" | "coverImage">;
    projectUsers: Omit<ProjectUser, "userId">[];
    collections: Array<Collection>;
}

/**
 * Returns the data for the demo, for the core-trpc/controller to handle,
 * don't actually write anything to firebase here to keep it separated
 *
 * This does merge the static data from data/demo-*.js to the proper models without IDs
 */
export async function getProjectDemoData({ demoType }: { demoType: ProjectDemoType }): Promise<{
    projectUsers: Omit<ProjectUser, "userId">[];
    collections: Array<Collection>;
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

    return pick(demoStaticData, "projectUsers", "collections");
}
