import {
    getFirebaseQueryReactQueryOptions,
    getFirebaseResourceReactQueryOptions,
} from "@owlprotocol/crud-firebase/query";
import { Query } from "@owlprotocol/crud-firebase";
import {
    ProjectApiKeyData,
    ProjectApiKeyId,
    ProjectContractData,
    ProjectContractId,
    ProjectId,
    ProjectUserData,
    ProjectUserId,
    ProjectUserWalletDfnsData,
    ProjectUserWalletDfnsId,
    ProjectUserWalletSafeData,
    ProjectUserWalletSafeId,
    TeamId,
    TeamMemberData,
    TeamMemberId,
    encodeProjectId,
    encodeTeamId,
} from "../models/index.js";
import {
    projectApiKeyResource,
    projectContractMetadataResource,
    projectContractResource,
    projectResource,
    projectTokenResource,
    projectTokenTemplateResource,
    projectUserResource,
    projectUserWalletDfnsResource,
    projectUserWalletSafeResource,
    projectWalletDfnsResource,
    projectWalletSafeResource,
    teamMemberResource,
    teamResource,
    userResource,
    teamNetworkResource,
} from "../web/resources.js";
import {
    projectPath,
    teamPath,
    userPath,
    teamMemberGroupPath,
    teamNetworkGroupPath,
    projectApiKeyGroupPath,
    projectContractGroupPath,
    projectContractMetadataGroupPath,
    projectTokenGroupPath,
    projectTokenTemplateGroupPath,
    projectUserGroupPath,
    projectUserWalletDfnsGroupPath,
    projectUserWalletSafeGroupPath,
    projectWalletDfnsGroupPath,
    projectWalletSafeGroupPath,
} from "../collections.js";
import {
    projectApiKeyGroupQuery,
    projectContractGroupQuery,
    projectUserGroupQuery,
    projectUserWalletDfnsGroupQuery,
    projectUserWalletSafeGroupQuery,
    teamMemberGroupQuery,
} from "../web/groupQueries.js";

/*** Collection Queries ***/
//TODO: REQUIRED Replace prefixPath/collectionGroup with computed => need getWhere to support getColPath()
//user & team
export const userQueryOptions = getFirebaseResourceReactQueryOptions(userResource, {
    prefixPath: [],
    collectionGroup: userPath,
});
export const teamQueryOptions = getFirebaseResourceReactQueryOptions(teamResource, {
    prefixPath: [],
    collectionGroup: teamPath,
});
export const teamMemberQueryOptions = getFirebaseResourceReactQueryOptions(
    teamMemberResource,
    (collectionId: TeamId) => {
        return {
            prefixPath: [teamPath, encodeTeamId(collectionId)],
            collectionGroup: teamMemberGroupPath,
        };
    },
);
export const teamNetworksQueryOptions = getFirebaseResourceReactQueryOptions(
    teamNetworkResource,
    (collectionId: TeamId) => {
        return {
            prefixPath: [teamPath, encodeTeamId(collectionId)],
            collectionGroup: teamNetworkGroupPath,
        };
    },
);

//project
export const projectQueryOptions = getFirebaseResourceReactQueryOptions(projectResource, {
    prefixPath: [],
    collectionGroup: projectPath,
});
export const projectApiKeyQueryOptions = getFirebaseResourceReactQueryOptions(
    projectApiKeyResource,
    (collectionId: ProjectId) => {
        return {
            prefixPath: [projectPath, encodeProjectId(collectionId)],
            collectionGroup: projectApiKeyGroupPath,
        };
    },
);
export const projectContractQueryOptions = getFirebaseResourceReactQueryOptions(
    projectContractResource,
    (collectionId: ProjectId) => {
        return {
            prefixPath: [projectPath, encodeProjectId(collectionId)],
            collectionGroup: projectContractGroupPath,
        };
    },
);
export const projectContractMetadataQueryOptions = getFirebaseResourceReactQueryOptions(
    projectContractMetadataResource,
    (collectionId: ProjectId) => {
        return {
            prefixPath: [projectPath, encodeProjectId(collectionId)],
            collectionGroup: projectContractMetadataGroupPath,
        };
    },
);
export const projectTokenQueryOptions = getFirebaseResourceReactQueryOptions(
    projectTokenResource,
    (collectionId: ProjectId) => {
        return {
            prefixPath: [projectPath, encodeProjectId(collectionId)],
            collectionGroup: projectTokenGroupPath,
        };
    },
);
export const projectTokenTemplateQueryOptions = getFirebaseResourceReactQueryOptions(
    projectTokenTemplateResource,
    (collectionId: ProjectId) => {
        return {
            prefixPath: [projectPath, encodeProjectId(collectionId)],
            collectionGroup: projectTokenTemplateGroupPath,
        };
    },
);

//project users
export const projectUserQueryOptions = getFirebaseResourceReactQueryOptions(
    projectUserResource,
    (collectionId: ProjectId) => {
        return {
            prefixPath: [projectPath, encodeProjectId(collectionId)],
            collectionGroup: projectUserGroupPath,
        };
    },
);
export const projectUserWalletDfnsQueryOptions = getFirebaseResourceReactQueryOptions(
    projectUserWalletDfnsResource,
    (collectionId: ProjectId) => {
        return {
            prefixPath: [projectPath, encodeProjectId(collectionId)],
            collectionGroup: projectUserWalletDfnsGroupPath,
        };
    },
);
export const projectUserWalletSafeQueryOptions = getFirebaseResourceReactQueryOptions(
    projectUserWalletSafeResource,
    (collectionId: ProjectId) => {
        return {
            prefixPath: [projectPath, encodeProjectId(collectionId)],
            collectionGroup: projectUserWalletSafeGroupPath,
        };
    },
);

//project wallets
export const projectWalletDfnsQueryOptions = getFirebaseResourceReactQueryOptions(
    projectWalletDfnsResource,
    (collectionId: ProjectId) => {
        return {
            prefixPath: [projectPath, encodeProjectId(collectionId)],
            collectionGroup: projectWalletDfnsGroupPath,
        };
    },
);
export const projectWalletSafeQueryOptions = getFirebaseResourceReactQueryOptions(
    projectWalletSafeResource,
    (collectionId: ProjectId) => {
        return {
            prefixPath: [projectPath, encodeProjectId(collectionId)],
            collectionGroup: projectWalletSafeGroupPath,
        };
    },
);

//users
export const teamMemberGroupQueryOptions = getFirebaseQueryReactQueryOptions<
    TeamMemberData,
    TeamMemberId,
    TeamId,
    TeamMemberData,
    TeamMemberData,
    Query<"web", TeamMemberData>
>(teamMemberGroupQuery, { prefixPath: [], collectionGroup: teamMemberGroupPath });

//project
export const projectApiKeyGroupQueryOptions = getFirebaseQueryReactQueryOptions<
    ProjectApiKeyData,
    ProjectApiKeyId,
    ProjectId,
    ProjectApiKeyData,
    ProjectApiKeyData,
    Query<"web", ProjectApiKeyData>
>(projectApiKeyGroupQuery, { prefixPath: [], collectionGroup: projectApiKeyGroupPath });
export const projectUserGroupQueryOptions = getFirebaseQueryReactQueryOptions<
    ProjectUserData,
    ProjectUserId,
    ProjectId,
    ProjectUserData,
    ProjectUserData,
    Query<"web", ProjectUserData>
>(projectUserGroupQuery, { prefixPath: [], collectionGroup: projectUserGroupPath });
export const projectUserWalletDfnsGroupQueryOptions = getFirebaseQueryReactQueryOptions<
    ProjectUserWalletDfnsData,
    ProjectUserWalletDfnsId,
    ProjectId,
    ProjectUserWalletDfnsData,
    ProjectUserWalletDfnsData,
    Query<"web", ProjectUserWalletDfnsData>
>(projectUserWalletDfnsGroupQuery, { prefixPath: [], collectionGroup: projectUserWalletDfnsGroupPath });
export const projectUserWalletSafeGroupQueryOptions = getFirebaseQueryReactQueryOptions<
    ProjectUserWalletSafeData,
    ProjectUserWalletSafeId,
    ProjectId,
    ProjectUserWalletSafeData,
    ProjectUserWalletSafeData,
    Query<"web", ProjectUserWalletSafeData>
>(projectUserWalletSafeGroupQuery, { prefixPath: [], collectionGroup: projectUserWalletSafeGroupPath });
export const projectContractGroupQueryOptions = getFirebaseQueryReactQueryOptions<
    ProjectContractData,
    ProjectContractId,
    ProjectId,
    ProjectContractData,
    ProjectContractData,
    Query<"web", ProjectContractData>
>(projectContractGroupQuery, { prefixPath: [], collectionGroup: projectContractGroupPath });
