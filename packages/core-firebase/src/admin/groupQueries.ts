import { getFirebaseQueryResource } from "@owlprotocol/crud-firebase/admin";
import { Query } from "@owlprotocol/crud-firebase";

import {
    erc721MintColGroup,
    projectApiKeyColGroup,
    projectContractColGroup,
    projectUserColGroup,
    projectUserWalletDfnsColGroup,
    projectUserWalletSafeColGroup,
    projectWalletDfnsColGroup,
    projectWalletSafeColGroup,
    teamMemberColGroup,
    teamNetworkColGroup,
} from "./collection.js";
import {
    ERC721MintData,
    ERC721MintId,
    NetworkDataDecoded,
    NetworkDataEncoded,
    NetworkDataInput,
    NetworkId,
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
    ProjectWalletDfnsData,
    ProjectWalletDfnsId,
    ProjectWalletSafeData,
    ProjectWalletSafeId,
    TeamId,
    TeamMemberData,
    TeamMemberId,
    decodeERC721MintId,
    decodeNetworkId,
    decodeProjectApiKeyId,
    decodeProjectContractId,
    decodeProjectId,
    decodeProjectUserId,
    decodeProjectUserWalletDfnsId,
    decodeProjectUserWalletSafeId,
    decodeProjectWalletDfnsId,
    decodeProjectWalletSafeId,
    decodeTeamId,
    decodeTeamMemberId,
    encodeERC721MintData,
    encodeERC721MintDataPartial,
    encodeNetworkId,
    encodeProjectApiKeyData,
    encodeProjectApiKeyDataPartial,
    encodeProjectContractData,
    encodeProjectContractDataPartial,
    encodeProjectId,
    encodeProjectUserData,
    encodeProjectUserDataPartial,
    encodeProjectUserWalletDfnsData,
    encodeProjectUserWalletDfnsDataPartial,
    encodeProjectUserWalletSafeData,
    encodeProjectUserWalletSafeDataPartial,
    encodeProjectWalletDfnsData,
    encodeProjectWalletDfnsDataPartial,
    encodeProjectWalletSafeData,
    encodeProjectWalletSafeDataPartial,
    encodeTeamId,
    encodeTeamMemberData,
    encodeTeamMemberDataPartial,
} from "../models/index.js";

//users
//Search user team membership across teams
export const teamMemberGroupQuery = getFirebaseQueryResource<
    TeamMemberData,
    TeamMemberId,
    TeamId,
    TeamMemberData,
    TeamMemberData,
    Query<"admin", TeamMemberData>
>(teamMemberColGroup, {
    decodeId: decodeTeamMemberId,
    encodeDataPartial: encodeTeamMemberDataPartial,
    decodeData: encodeTeamMemberData,
    encodeParentDocId: encodeTeamId,
    decodeParentDocId: decodeTeamId,
});
export const teamNetworkGroupQuery = getFirebaseQueryResource<
    NetworkDataDecoded,
    NetworkId,
    TeamId,
    NetworkDataInput,
    NetworkDataEncoded,
    Query<"admin", NetworkDataEncoded>
>(teamNetworkColGroup, {
    decodeId: decodeNetworkId,
    encodeParentDocId: encodeTeamId,
    decodeParentDocId: decodeTeamId,
});

//project
//Search project api key across projects
export const projectApiKeyGroupQuery = getFirebaseQueryResource<
    ProjectApiKeyData,
    ProjectApiKeyId,
    ProjectId,
    ProjectApiKeyData,
    ProjectApiKeyData,
    Query<"admin", ProjectApiKeyData>
>(projectApiKeyColGroup, {
    decodeId: decodeProjectApiKeyId,
    encodeDataPartial: encodeProjectApiKeyDataPartial,
    decodeData: encodeProjectApiKeyData,
    encodeParentDocId: encodeProjectId,
    decodeParentDocId: decodeProjectId,
});

//Search project user across projects
export const projectUserGroupQuery = getFirebaseQueryResource<
    ProjectUserData,
    ProjectUserId,
    ProjectId,
    ProjectUserData,
    ProjectUserData,
    Query<"admin", ProjectUserData>
>(projectUserColGroup, {
    decodeId: decodeProjectUserId,
    encodeDataPartial: encodeProjectUserDataPartial,
    decodeData: encodeProjectUserData,
    encodeParentDocId: encodeProjectId,
    decodeParentDocId: decodeProjectId,
});

//Search dfns wallet across projects
export const projectWalletDfnsGroupQuery = getFirebaseQueryResource<
    ProjectWalletDfnsData,
    ProjectWalletDfnsId,
    ProjectId,
    ProjectWalletDfnsData,
    ProjectWalletDfnsData,
    Query<"admin", ProjectWalletDfnsData>
>(projectWalletDfnsColGroup, {
    decodeId: decodeProjectWalletDfnsId,
    encodeDataPartial: encodeProjectWalletDfnsDataPartial,
    decodeData: encodeProjectWalletDfnsData,
    encodeParentDocId: encodeProjectId,
    decodeParentDocId: decodeProjectId,
});
export const projectWalletSafeGroupQuery = getFirebaseQueryResource<
    ProjectWalletSafeData,
    ProjectWalletSafeId,
    ProjectId,
    ProjectWalletSafeData,
    ProjectWalletSafeData,
    Query<"admin", ProjectWalletSafeData>
>(projectWalletSafeColGroup, {
    decodeId: decodeProjectWalletSafeId,
    encodeDataPartial: encodeProjectWalletSafeDataPartial,
    decodeData: encodeProjectWalletSafeData,
    encodeParentDocId: encodeProjectId,
    decodeParentDocId: decodeProjectId,
});

//Search user dfns wallets across projects
export const projectUserWalletDfnsGroupQuery = getFirebaseQueryResource<
    ProjectUserWalletDfnsData,
    ProjectUserWalletDfnsId,
    ProjectId,
    ProjectUserWalletDfnsData,
    ProjectUserWalletDfnsData,
    Query<"admin", ProjectUserWalletDfnsData>
>(projectUserWalletDfnsColGroup, {
    decodeId: decodeProjectUserWalletDfnsId,
    encodeDataPartial: encodeProjectUserWalletDfnsDataPartial,
    decodeData: encodeProjectUserWalletDfnsData,
    encodeParentDocId: encodeProjectId,
    decodeParentDocId: decodeProjectId,
});
//Search user safe wallets across projects
export const projectUserWalletSafeGroupQuery = getFirebaseQueryResource<
    ProjectUserWalletSafeData,
    ProjectUserWalletSafeId,
    ProjectId,
    ProjectUserWalletSafeData,
    ProjectUserWalletSafeData,
    Query<"admin", ProjectUserWalletSafeData>
>(projectUserWalletSafeColGroup, {
    decodeId: decodeProjectUserWalletSafeId,
    encodeDataPartial: encodeProjectUserWalletSafeDataPartial,
    decodeData: encodeProjectUserWalletSafeData,
    encodeParentDocId: encodeProjectId,
    decodeParentDocId: decodeProjectId,
});
//Search contracts across projects
export const projectContractGroupQuery = getFirebaseQueryResource<
    ProjectContractData,
    ProjectContractId,
    ProjectId,
    ProjectContractData,
    ProjectContractData,
    Query<"admin", ProjectContractData>
>(projectContractColGroup, {
    decodeId: decodeProjectContractId,
    encodeDataPartial: encodeProjectContractDataPartial,
    decodeData: encodeProjectContractData,
    encodeParentDocId: encodeProjectId,
    decodeParentDocId: decodeProjectId,
});

//Search erc721 mints across networks
export const erc721MintsGroupQuery = getFirebaseQueryResource<
    ERC721MintData,
    ERC721MintId,
    NetworkId,
    ERC721MintData,
    ERC721MintData,
    Query<"admin", ERC721MintData>
>(erc721MintColGroup, {
    decodeId: decodeERC721MintId,
    encodeDataPartial: encodeERC721MintDataPartial,
    decodeData: encodeERC721MintData,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
