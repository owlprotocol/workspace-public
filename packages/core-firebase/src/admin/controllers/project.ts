import { v4 as uuidv4 } from "uuid";
import { networkResource, NetworkId } from "@owlprotocol/eth-firebase/admin";
import { isUUID } from "../../utils/uuid.js";
import { Project, TeamNetwork } from "../../models/index.js";
import { teamNetworkResource, projectApiKeyResource, projectResource } from "../resources.js";
import { projectApiKeyGroupQuery } from "../groupQueries.js";

// We export these messages so they can be used in the API when changing defaultChainId"
export const defaultChainIdNotFoundErrorMessage = "Network from defaultChainId not found" as const;
export const defaultChainIdNotEnabledErrorMessage = "Network from defaultChainId is not enabled" as const;

export class ProjectSlugExistsError extends Error {
    constructor(slug?: string, options?: ErrorOptions) {
        super(`Project slug "${slug}" already exists. Please choose a unique slug.`, options);
    }
}

/**
 * Create Project
 * - check slug uniquenes
 * - generate projectId (always generated)
 * - set project
 * - generate apiKey
 * - set apiKey
 * @param project
 * @returns
 */
export async function createProject(project: Omit<Project, "projectId">): Promise<string> {
    const { slug } = project;

    const slugExists = !!(await projectResource.getWhereFirst({ slug }));
    if (slugExists) {
        throw new ProjectSlugExistsError(slug);
    }

    if (isUUID(slug)) {
        throw new Error("Slug cannot be a UUID");
    }

    // Check if chain id is enabled
    const chainId = project.defaultChainId;
    const globalNetwork = await networkResource.getWhereFirst({ chainId });
    let teamNetwork: (Required<NetworkId> & TeamNetwork) | null;

    if (!globalNetwork) {
        // now check team networks
        teamNetwork = await teamNetworkResource.getWhereFirst({ teamId: project.teamId, chainId });

        if (!teamNetwork) {
            throw new Error(defaultChainIdNotFoundErrorMessage);
        }
    } else {
        teamNetwork = null;
    }

    if ((globalNetwork && !globalNetwork.enabled) || (teamNetwork && !teamNetwork.enabled)) {
        throw new Error(defaultChainIdNotEnabledErrorMessage);
    }

    const projectId = uuidv4();
    const apiKey = uuidv4();
    await Promise.all([
        projectResource.set({ ...project, projectId }),
        projectApiKeyResource.set({
            projectId,
            apiKey,
            role: "admin",
        }),
    ]);

    return projectId;
}

//FirebaseQueryResource<FirestoreSDK, ResourceData, ResourceId>
export async function getProjectWithApiKey(apiKey: string): Promise<Project | null> {
    const projectApiKey = await projectApiKeyGroupQuery.getWhereFirst({ apiKey });
    if (!projectApiKey) return null;

    const project = await projectResource.getOrNull({ projectId: projectApiKey.projectId });
    return project;
}
