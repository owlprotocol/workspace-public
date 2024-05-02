//TODO: Use join to concat path. Disabled for web compatibility for now
// import { join } from "path";
import {
    ProjectId,
    ProjectUserListId,
    TeamId,
    encodeProjectId,
    encodeProjectUserListId,
    encodeTeamId,
} from "./models/index.js";

//Hacky join implementation
function join(...parameters: string[]) {
    return parameters.join("/");
}

//users
export const userPath = "user";
export const teamPath = "team";
export const teamMemberGroupPath = "teamMember";
export const teamMemberPath = (collectionId: TeamId) => {
    return join(teamPath, encodeTeamId(collectionId), teamMemberGroupPath);
};
export const teamNetworkGroupPath = "teamNetwork";
export const teamNetworkPath = (collectionId: TeamId) => {
    return join(teamPath, encodeTeamId(collectionId), teamNetworkGroupPath);
};
//project
export const projectPath = "project";
export const projectApiKeyGroupPath = "projectApiKey";
export const projectApiKeyPath = (collectionId: ProjectId) => {
    return join(projectPath, encodeProjectId(collectionId), projectApiKeyGroupPath);
};

//project users
export const projectUserGroupPath = "projectUser";
export const projectUserPath = (collectionId: ProjectId) => {
    return join(projectPath, encodeProjectId(collectionId), projectUserGroupPath);
};
export const projectUserListGroupPath = "projectUserList";
export const projectUserListPath = (collectionId: ProjectId) => {
    return join(projectPath, encodeProjectId(collectionId), projectUserListGroupPath);
};
export const projectUserListMemberGroupPath = "projectUserListMember";
export const projectUserListMemberPath = (collectionId: ProjectId & ProjectUserListId) => {
    return join(
        projectPath,
        encodeProjectId(collectionId),
        projectUserGroupPath,
        encodeProjectUserListId(collectionId),
        projectUserListMemberGroupPath,
    );
};

//wallets used by project
export const projectWalletDfnsGroupPath = "projectWalletDfns";
export const projectWalletDfnsPath = (collectionId: ProjectId) => {
    return join(projectPath, encodeProjectId(collectionId), projectWalletDfnsGroupPath);
};

export const projectWalletSafeGroupPath = "projectWalletSafe";
export const projectWalletSafePath = (collectionId: ProjectId) => {
    return join(projectPath, encodeProjectId(collectionId), projectWalletSafeGroupPath);
};

//wallets used by users
export const projectUserWalletDfnsGroupPath = "projectUserWalletDfns";
export const projectUserWalletDfnsPath = (collectionId: ProjectId) => {
    return join(projectPath, encodeProjectId(collectionId), projectUserWalletDfnsGroupPath);
};

export const projectUserWalletSafeGroupPath = "projectUserWalletSafe";
export const projectUserWalletSafePath = (collectionId: ProjectId) => {
    return join(projectPath, encodeProjectId(collectionId), projectUserWalletSafeGroupPath);
};

//contracts
export const projectContractGroupPath = "projectContract";
export const projectContractPath = (collectionId: ProjectId) => {
    return join(projectPath, encodeProjectId(collectionId), projectContractGroupPath);
};
export const projectContractMetadataGroupPath = "projectContractMetadata";
export const projectContractMetadataPath = (collectionId: ProjectId) => {
    return join(projectPath, encodeProjectId(collectionId), projectContractMetadataGroupPath);
};
export const projectTokenGroupPath = "projectToken";
export const projectTokenPath = (collectionId: ProjectId) => {
    return join(projectPath, encodeProjectId(collectionId), projectTokenGroupPath);
};
export const projectTokenTemplateGroupPath = "projectTokenTemplate";
export const projectTokenTemplatePath = (collectionId: ProjectId) => {
    return join(projectPath, encodeProjectId(collectionId), projectTokenTemplateGroupPath);
};
export const projectMintRuleGroupPath = "projectMintRule";
export const projectMintRulePath = (collectionId: ProjectId) => {
    return join(projectPath, encodeProjectId(collectionId), projectMintRuleGroupPath);
};
export const projectMintClaimGroupPath = "projectMintClaim";
export const projectMintClaimPath = (collectionId: ProjectId) => {
    return join(projectPath, encodeProjectId(collectionId), projectMintClaimGroupPath);
};
