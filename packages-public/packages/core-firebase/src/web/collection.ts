import { firestore, getColRef, getColGroupRef } from "@owlprotocol/crud-firebase/web";
import {
    networkPath,
    projectPath,
    teamPath,
    userPath,
    teamMemberGroupPath,
    teamNetworkGroupPath,
    projectApiKeyGroupPath,
    projectUserGroupPath,
    projectUserWalletDfnsGroupPath,
    projectContractGroupPath,
    projectUserWalletSafeGroupPath,
    teamMemberPath,
    teamNetworkPath,
    projectApiKeyPath,
    projectUserPath,
    projectUserListPath,
    projectUserListMemberPath,
    projectWalletDfnsPath,
    projectWalletSafePath,
    projectUserWalletDfnsPath,
    projectUserWalletSafePath,
    projectContractMetadataPath,
    projectContractPath,
    projectTokenPath,
    projectTokenTemplatePath,
    networkPrivatePath,
    projectWalletDfnsGroupPath,
    projectWalletSafeGroupPath,
} from "../collections.js";
import {
    Network,
    NetworkPrivate,
    ProjectApiKeyData,
    ProjectContractData,
    ProjectContractMetadataData,
    ProjectData,
    ProjectId,
    ProjectTokenData,
    ProjectTokenTemplateData,
    ProjectUserData,
    ProjectUserListData,
    ProjectUserListId,
    ProjectUserListMemberData,
    ProjectUserWalletDfnsData,
    ProjectUserWalletSafeData,
    ProjectWalletDfnsData,
    ProjectWalletSafeData,
    TeamData,
    TeamId,
    TeamMemberData,
    TeamNetwork,
    UserData,
} from "../models/index.js";

//networks
export const networkCol = getColRef<Network>(firestore, networkPath);
export const networkPrivateCol = getColRef<NetworkPrivate>(firestore, networkPrivatePath);

//users
export const userCol = getColRef<UserData>(firestore, userPath);
export const teamCol = getColRef<TeamData>(firestore, teamPath);

export const teamMemberColGroup = getColGroupRef<TeamMemberData>(firestore, teamMemberGroupPath);
export const teamMemberCol = (collectionId: TeamId) =>
    getColRef<TeamMemberData>(firestore, teamMemberPath(collectionId));

export const teamNetworkColGroup = getColGroupRef<TeamNetwork>(firestore, teamNetworkGroupPath);
export const teamNetworkCol = (collectionId: TeamId) =>
    getColRef<TeamNetwork>(firestore, teamNetworkPath(collectionId));

//project
export const projectCol = getColRef<ProjectData>(firestore, projectPath);
export const projectApiKeyColGroup = getColGroupRef<ProjectApiKeyData>(firestore, projectApiKeyGroupPath);
export const projectApiKeyCol = (collectionId: ProjectId) =>
    getColRef<ProjectApiKeyData>(firestore, projectApiKeyPath(collectionId));

//project users
export const projectUserColGroup = getColGroupRef<ProjectUserData>(firestore, projectUserGroupPath);
export const projectUserCol = (collectionId: ProjectId) =>
    getColRef<ProjectUserData>(firestore, projectUserPath(collectionId));

export const projectUserListCol = (collectionId: ProjectId) =>
    getColRef<ProjectUserListData>(firestore, projectUserListPath(collectionId));

export const projectUserListMemberCol = (collectionId: ProjectId & ProjectUserListId) =>
    getColRef<ProjectUserListMemberData>(firestore, projectUserListMemberPath(collectionId));

//wallets used by project
export const projectWalletDfnsColGroup = getColGroupRef<ProjectWalletDfnsData>(firestore, projectWalletDfnsGroupPath);
export const projectWalletDfnsCol = (collectionId: ProjectId) =>
    getColRef<ProjectWalletDfnsData>(firestore, projectWalletDfnsPath(collectionId));
export const projectWalletSafeColGroup = getColGroupRef<ProjectWalletSafeData>(firestore, projectWalletSafeGroupPath);
export const projectWalletSafeCol = (collectionId: ProjectId) =>
    getColRef<ProjectWalletSafeData>(firestore, projectWalletSafePath(collectionId));
//wallets used by users
export const projectUserWalletDfnsColGroup = getColGroupRef<ProjectUserWalletDfnsData>(
    firestore,
    projectUserWalletDfnsGroupPath,
);
export const projectUserWalletDfnsCol = (collectionId: ProjectId) =>
    getColRef<ProjectUserWalletDfnsData>(firestore, projectUserWalletDfnsPath(collectionId));

export const projectUserWalletSafeColGroup = getColGroupRef<ProjectUserWalletSafeData>(
    firestore,
    projectUserWalletSafeGroupPath,
);
export const projectUserWalletSafeCol = (collectionId: ProjectId) =>
    getColRef<ProjectUserWalletSafeData>(firestore, projectUserWalletSafePath(collectionId));

//contracts
export const projectContractColGroup = getColGroupRef<ProjectContractData>(firestore, projectContractGroupPath);
export const projectContractCol = (collectionId: ProjectId) =>
    getColRef<ProjectContractData>(firestore, projectContractPath(collectionId));
export const projectContractMetadataCol = (collectionId: ProjectId) =>
    getColRef<ProjectContractMetadataData>(firestore, projectContractMetadataPath(collectionId));
export const projectTokenCol = (collectionId: ProjectId) =>
    getColRef<ProjectTokenData>(firestore, projectTokenPath(collectionId));
export const projectTokenTemplateCol = (collectionId: ProjectId) =>
    getColRef<ProjectTokenTemplateData>(firestore, projectTokenTemplatePath(collectionId));
