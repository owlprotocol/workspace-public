import { firestore, getFirebaseResource } from "@owlprotocol/crud-firebase/web";
import {
    networkCol,
    networkPrivateCol,
    projectApiKeyCol,
    projectCol,
    projectContractCol,
    projectContractMetadataCol,
    projectTokenCol,
    projectTokenTemplateCol,
    projectUserCol,
    projectUserWalletDfnsCol,
    projectUserWalletSafeCol,
    projectWalletDfnsCol,
    projectWalletSafeCol,
    teamCol,
    teamMemberCol,
    teamNetworkCol,
    userCol,
} from "./collection.js";
import {
    Network,
    NetworkId,
    NetworkPrivate,
    decodeNetworkId,
    encodeNetworkId,
    encodeNetwork,
    encodeNetworkPartial,
    encodeNetworkPrivate,
    encodeNetworkPrivatePartial,
    UserData,
    UserId,
    decodeUserId,
    encodeUserData,
    encodeUserDataPartial,
    encodeUserId,
    TeamData,
    TeamId,
    decodeTeamId,
    encodeTeamData,
    encodeTeamDataPartial,
    encodeTeamId,
    TeamMemberData,
    TeamMemberId,
    decodeTeamMemberId,
    encodeTeamMemberData,
    encodeTeamMemberDataPartial,
    encodeTeamMemberId,
    TeamNetwork,
    encodeTeamNetwork,
    encodeTeamNetworkPartial,
    ProjectData,
    ProjectId,
    decodeProjectId,
    encodeProjectData,
    encodeProjectDataPartial,
    encodeProjectId,
    ProjectApiKeyData,
    ProjectApiKeyId,
    decodeProjectApiKeyId,
    encodeProjectApiKeyData,
    encodeProjectApiKeyDataPartial,
    encodeProjectApiKeyId,
    ProjectContractData,
    ProjectContractId,
    ProjectContractMetadataData,
    ProjectTokenData,
    ProjectTokenId,
    ProjectTokenTemplateData,
    ProjectTokenTemplateId,
    decodeProjectContractId,
    decodeProjectTokenId,
    decodeProjectTokenTemplateId,
    encodeProjectContractData,
    encodeProjectContractDataPartial,
    encodeProjectContractId,
    encodeProjectContractMetadataData,
    encodeProjectContractMetadataDataPartial,
    encodeProjectTokenData,
    encodeProjectTokenDataPartial,
    encodeProjectTokenId,
    encodeProjectTokenTemplateData,
    encodeProjectTokenTemplateDataPartial,
    encodeProjectTokenTemplateId,
    ProjectUserData,
    ProjectUserId,
    ProjectUserWalletDfnsData,
    ProjectUserWalletDfnsId,
    decodeProjectUserId,
    decodeProjectUserWalletDfnsId,
    encodeProjectUserData,
    encodeProjectUserDataPartial,
    encodeProjectUserId,
    encodeProjectUserWalletDfnsData,
    encodeProjectUserWalletDfnsDataPartial,
    encodeProjectUserWalletDfnsId,
    ProjectUserWalletSafeData,
    ProjectUserWalletSafeId,
    decodeProjectUserWalletSafeId,
    encodeProjectUserWalletSafeData,
    encodeProjectUserWalletSafeDataPartial,
    encodeProjectUserWalletSafeId,
    ProjectWalletDfnsData,
    ProjectWalletDfnsId,
    ProjectWalletSafeData,
    ProjectWalletSafeId,
    decodeProjectWalletDfnsId,
    decodeProjectWalletSafeId,
    encodeProjectWalletDfnsData,
    encodeProjectWalletDfnsDataPartial,
    encodeProjectWalletDfnsId,
    encodeProjectWalletSafeData,
    encodeProjectWalletSafeDataPartial,
    encodeProjectWalletSafeId,
} from "../models/index.js";

//networks
export const networkResource = getFirebaseResource<Network, NetworkId>(firestore, networkCol, {
    encodeId: encodeNetworkId,
    decodeId: decodeNetworkId,
    encodeDataPartial: encodeNetworkPartial,
    encodeData: encodeNetwork,
});
export const networkPrivateResource = getFirebaseResource<NetworkPrivate, NetworkId>(firestore, networkPrivateCol, {
    encodeId: encodeNetworkId,
    decodeId: decodeNetworkId,
    encodeDataPartial: encodeNetworkPrivatePartial,
    encodeData: encodeNetworkPrivate,
});

//user & team
export const userResource = getFirebaseResource<UserData, UserId>(firestore, userCol, {
    encodeId: encodeUserId,
    decodeId: decodeUserId,
    encodeDataPartial: encodeUserDataPartial,
    encodeData: encodeUserData,
});
export const teamResource = getFirebaseResource<TeamData, TeamId>(firestore, teamCol, {
    encodeId: encodeTeamId,
    decodeId: decodeTeamId,
    encodeDataPartial: encodeTeamDataPartial,
    encodeData: encodeTeamData,
});
export const teamMemberResource = getFirebaseResource<TeamMemberData, TeamMemberId, TeamId>(firestore, teamMemberCol, {
    encodeId: encodeTeamMemberId,
    decodeId: decodeTeamMemberId,
    encodeDataPartial: encodeTeamMemberDataPartial,
    encodeData: encodeTeamMemberData,
    encodeParentDocId: encodeTeamId,
    decodeParentDocId: decodeTeamId,
});
//TODO: Rename as alias TeamNetworkId, TeamNetworkData
export const teamNetworkResource = getFirebaseResource<TeamNetwork, NetworkId, TeamId>(firestore, teamNetworkCol, {
    encodeId: encodeNetworkId,
    decodeId: decodeNetworkId,
    encodeDataPartial: encodeTeamNetworkPartial,
    encodeData: encodeTeamNetwork,
    encodeParentDocId: encodeTeamId,
    decodeParentDocId: decodeTeamId,
});
//project
export const projectResource = getFirebaseResource<ProjectData, ProjectId>(firestore, projectCol, {
    encodeId: encodeProjectId,
    decodeId: decodeProjectId,
    encodeDataPartial: encodeProjectDataPartial,
    encodeData: encodeProjectData,
});
export const projectApiKeyResource = getFirebaseResource<ProjectApiKeyData, ProjectApiKeyId, ProjectId>(
    firestore,
    projectApiKeyCol,
    {
        encodeId: encodeProjectApiKeyId,
        decodeId: decodeProjectApiKeyId,
        encodeDataPartial: encodeProjectApiKeyDataPartial,
        encodeData: encodeProjectApiKeyData,
        encodeParentDocId: encodeProjectId,
        decodeParentDocId: decodeProjectId,
    },
);
export const projectContractResource = getFirebaseResource<ProjectContractData, ProjectContractId, ProjectId>(
    firestore,
    projectContractCol,
    {
        encodeId: encodeProjectContractId,
        decodeId: decodeProjectContractId,
        encodeDataPartial: encodeProjectContractDataPartial,
        encodeData: encodeProjectContractData,
        encodeParentDocId: encodeProjectId,
        decodeParentDocId: decodeProjectId,
    },
);

//TODO: Rename as alias ProjectContractMetadataId
export const projectContractMetadataResource = getFirebaseResource<
    ProjectContractMetadataData,
    ProjectContractId,
    ProjectId
>(firestore, projectContractMetadataCol, {
    encodeId: encodeProjectContractId,
    decodeId: decodeProjectContractId,
    encodeDataPartial: encodeProjectContractMetadataDataPartial,
    encodeData: encodeProjectContractMetadataData,
    encodeParentDocId: encodeProjectId,
    decodeParentDocId: decodeProjectId,
});
export const projectTokenResource = getFirebaseResource<ProjectTokenData, ProjectTokenId, ProjectId>(
    firestore,
    projectTokenCol,
    {
        encodeId: encodeProjectTokenId,
        decodeId: decodeProjectTokenId,
        encodeDataPartial: encodeProjectTokenDataPartial,
        encodeData: encodeProjectTokenData,
        encodeParentDocId: encodeProjectId,
        decodeParentDocId: decodeProjectId,
    },
);
export const projectTokenTemplateResource = getFirebaseResource<
    ProjectTokenTemplateData,
    ProjectTokenTemplateId,
    ProjectId
>(firestore, projectTokenTemplateCol, {
    encodeId: encodeProjectTokenTemplateId,
    decodeId: decodeProjectTokenTemplateId,
    encodeDataPartial: encodeProjectTokenTemplateDataPartial,
    encodeData: encodeProjectTokenTemplateData,
    encodeParentDocId: encodeProjectId,
    decodeParentDocId: decodeProjectId,
});

//project users
export const projectUserResource = getFirebaseResource<ProjectUserData, ProjectUserId, ProjectId>(
    firestore,
    projectUserCol,
    {
        encodeId: encodeProjectUserId,
        decodeId: decodeProjectUserId,
        encodeDataPartial: encodeProjectUserDataPartial,
        encodeData: encodeProjectUserData,
        encodeParentDocId: encodeProjectId,
        decodeParentDocId: decodeProjectId,
    },
);

//project wallets
export const projectWalletDfnsResource = getFirebaseResource<ProjectWalletDfnsData, ProjectWalletDfnsId, ProjectId>(
    firestore,
    projectWalletDfnsCol,
    {
        encodeId: encodeProjectWalletDfnsId,
        decodeId: decodeProjectWalletDfnsId,
        encodeDataPartial: encodeProjectWalletDfnsDataPartial,
        encodeData: encodeProjectWalletDfnsData,
        encodeParentDocId: encodeProjectId,
        decodeParentDocId: decodeProjectId,
    },
);
export const projectWalletSafeResource = getFirebaseResource<ProjectWalletSafeData, ProjectWalletSafeId, ProjectId>(
    firestore,
    projectWalletSafeCol,
    {
        encodeId: encodeProjectWalletSafeId,
        decodeId: decodeProjectWalletSafeId,
        encodeDataPartial: encodeProjectWalletSafeDataPartial,
        encodeData: encodeProjectWalletSafeData,
        encodeParentDocId: encodeProjectId,
        decodeParentDocId: decodeProjectId,
    },
);

//user wallets
export const projectUserWalletDfnsResource = getFirebaseResource<
    ProjectUserWalletDfnsData,
    ProjectUserWalletDfnsId,
    ProjectId
>(firestore, projectUserWalletDfnsCol, {
    encodeId: encodeProjectUserWalletDfnsId,
    decodeId: decodeProjectUserWalletDfnsId,
    encodeDataPartial: encodeProjectUserWalletDfnsDataPartial,
    encodeData: encodeProjectUserWalletDfnsData,
    encodeParentDocId: encodeProjectId,
    decodeParentDocId: decodeProjectId,
});
export const projectUserWalletSafeResource = getFirebaseResource<
    ProjectUserWalletSafeData,
    ProjectUserWalletSafeId,
    ProjectId
>(firestore, projectUserWalletSafeCol, {
    encodeId: encodeProjectUserWalletSafeId,
    decodeId: decodeProjectUserWalletSafeId,
    encodeDataPartial: encodeProjectUserWalletSafeDataPartial,
    encodeData: encodeProjectUserWalletSafeData,
    encodeParentDocId: encodeProjectId,
    decodeParentDocId: decodeProjectId,
});
