import { map, flatten } from "lodash-es";
import { Address, Hash, zeroHash } from "viem";
import { localhost } from "./chains.js";
import {
    DfnsWalletStatus,
    // ERC1155,
    // ERC1155Balance,
    // ERC20,
    // ERC20Balance,
    ERC721,
    EthBlock,
    EthLog,
    EthTransaction,
    Network,
    Operator,
    CollectionContractType,
    Project,
    ProjectApiKey,
    ProjectContract,
    ProjectContractMetadata,
    ProjectToken,
    ProjectTokenTemplate,
    ProjectUser,
    ProjectUserWalletDfns,
    ProjectUserWalletSafe,
    ProjectWalletDfns,
    ProjectWalletSafe,
    Team,
    TeamMember,
    TeamNetwork,
    User,
    NetworkPrivate,
} from "../models/index.js";
import {
    // erc1155BalanceResource,
    // erc1155Resource,
    // erc20BalanceResource,
    // erc20Resource,
    erc721Resource,
    ethBlockResource,
    ethLogResource,
    ethTransactionResource,
    networkPrivateResource,
    networkResource,
    operatorResource,
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
    teamNetworkResource,
    teamResource,
    userResource,
} from "../admin/index.js";

/**
 * Get a test uuid
 * @param n
 * @returns test uuid
 */
export function getUUID(n: number) {
    //00000000000n
    const id = `${n}`.padStart(12, "0");
    return `00000000-0000-0000-0000-${id}`;
}

/**
 * Get a test address
 * @param n
 * @returns test address
 */
export function getAddress(n: number): Address {
    return ("0x" + n.toString(16).padStart(40, "0")) as Address;
}

/**
 * Get a test bytes32 string (eg. hash)
 * @param n
 * @returns
 */
export function getBytes32(n: number | bigint): Hash {
    return ("0x" + n.toString(16).padStart(64, "0")) as Hash;
}

/**
 * General Rule for Test Data id offsets (makes it easier to view)
 * - Block              000_001 - 000_099
 * - Transaction        000_100 - 000_999
 *
 * - ERC20              001_100 - 001_199
 * - ERC721             001_200 - 001_299
 * - ERC1155            001_300 - 001_399
 *
 * - User               100_000 - 100_099
 * - Team               100_100 - 100_199
 * - Project            100_200 - 100_249
 *  - User              100_250 - 100_299
 *  - ApiKey            100_300 - 100_399
 *  - Contract          Use contract info
 *  - ContractMetadata  100_400 - 100_499
 *  - UserWalletDfns    100_500 - 100_599
 *  - UserWalletSafe    100_600 - 100_699
 *  - WalletDfns        100_700 - 100_799
 *  - WalletSafe        100_800 - 100_899
 */

//network

//anvil localhost
export const chainId1337 = 1337;

//TODO: Add back opBedrockL1, opBedrockL2, hedwigTestnet. Do NOT add chains package as dependency
export const networks: Network[] = [localhost];
export const networkPrivates: NetworkPrivate[] = [localhost];

//contractmodels
// export const erc20s: ERC20[] = [
//     {
//         address: getAddress(1_100),
//         symbol: "USDC",
//         logoURI:
//             "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Circle_USDC_Logo.svg/1024px-Circle_USDC_Logo.svg.png?20220815163658",
//     },
//     {
//         address: getAddress(1_200),
//         symbol: "LMN",
//     },
// ];
// export const erc20Balances: ERC20Balance[] = [
//     {
//         address: getAddress(1_100),
//         account: getAddress(1_000),
//         balance: 1,
//     },
//     {
//         address: getAddress(1_200),
//         account: getAddress(1_000),
//         balance: "2000000000000000",
//     },
// ];
export const erc721s: ERC721[] = [
    {
        address: getAddress(1_200),
        tokenId: "1",
        metadata: {
            name: "ERC721 #1",
            image: "https://via.assets.so/game.png?id=8&q=95&w=300&h=300&fit=fill",
            attributes: [
                {
                    trait_type: "Color",
                    value: "red",
                },
            ],
        },
    },
    {
        address: getAddress(1_200),
        tokenId: "2",
        metadata: {
            name: "ERC721 #2",
            image: "https://via.assets.so/game.png?id=8&q=95&w=300&h=300&fit=fill",
            attributes: [
                {
                    trait_type: "Color",
                    value: "red",
                },
            ],
        },
    },
    {
        address: getAddress(1_200),
        tokenId: "3",
        metadata: {
            name: "ERC721 #3",
            image: "https://via.assets.so/game.png?id=8&q=95&w=300&h=300&fit=fill",
            attributes: [
                {
                    trait_type: "Color",
                    value: "red",
                },
            ],
        },
    },
];
// export const erc1155s: ERC1155[] = [
//     {
//         address: getAddress(1_300),
//         id: "1",
//         metadata: {
//             name: "ERC1155 #1",
//             image: "https://via.assets.so/game.png?id=8&q=95&w=300&h=300&fit=fill",
//             attributes: [
//                 {
//                     trait_type: "Color",
//                     value: "blue",
//                 },
//             ],
//         },
//     },
// ];
// export const erc1155Balances: ERC1155Balance[] = [
//     {
//         address: getAddress(1_300),
//         id: "1",
//         account: getAddress(1_000),
//         balance: "1",
//     },
// ];
export const operators: Operator[] = [
    {
        address: getAddress(1_300),
        owner: getAddress(1_000),
        operator: getAddress(1_001),
        approved: true,
    },
];

//ethmodels

//create EthAddress for each contract
//Concatenate all contracts (not used as any model on firebase)
export const ethAddresses = flatten([
    // map(erc20s, ({ address }) => {
    //     return {
    //         address,
    //         isContract: true,
    //     };
    // }),
    map(erc721s, ({ address }) => {
        return {
            address,
            isContract: true,
        };
    }),
    // map(erc1155s, ({ address }) => {
    //     return {
    //         address,
    //         isContract: true,
    //     };
    // }),
]);

//creat eth log for each contract
export const ethLogs: EthLog[] = map(ethAddresses, ({ address }, i) => {
    return {
        blockHash: getBytes32(i + 1),
        logIndex: 0,
        blockNumber: i + 1,
        transactionHash: getBytes32(100 + i),
        transactionIndex: i,
        address,
        topics: [],
        data: "0x1",
    };
});

export const ethBlocks: EthBlock[] = map(ethLogs, ({ blockHash, blockNumber }) => {
    const block: EthBlock = {
        hash: blockHash,
        number: blockNumber,
        parentHash: getBytes32(BigInt(blockNumber) - 1n),
        nonce: "0x1",
        difficulty: 1n,
        miner: getAddress(1_001),
        extraData: "0x1",
        mixHash: zeroHash,
        size: 1n,
        stateRoot: zeroHash,
        timestamp: 1,
        uncles: [],
        sha3Uncles: zeroHash,
        gasLimit: 100n,
        gasUsed: 100n,
        receiptsRoot: zeroHash,
        logsBloom: "0x",
        transactions: [],
        transactionsRoot: zeroHash,
    };

    return block;
});

export const ethTransactions: EthTransaction[] = map(
    ethLogs,
    ({ transactionHash, address, blockHash, blockNumber }, i) => {
        const transaction: EthTransaction = {
            hash: transactionHash,
            blockNumber,
            blockHash,
            transactionIndex: i,
            from: getAddress(1_001),
            to: address,
            nonce: i,
            input: "0x1",
            value: 1n,
            gas: 1n,
            gasPrice: 1n,
            r: "0x1",
            s: "0x1",
            v: "0x1",
            type: "0x0",
        };
        return transaction;
    },
);
//TODO: Add Roles, ABIs

//user & team
export const users: User[] = [
    {
        userId: getUUID(100_000),
        email: "user100_000@example.com",
    },
];
export const teams: Team[] = [
    {
        teamId: getUUID(100_100),
        owner: users[0].userId,
        name: "Team 100_100",
        slug: "team-100-100",
    },
    {
        teamId: getUUID(100_101),
        owner: users[0].userId,
        name: "Team 100_101",
        slug: "team-100-101",
    },
];
export const teamMembers: TeamMember[] = [
    {
        userId: users[0].userId,
        role: "member",
    },
];
export const teamNetworks: TeamNetwork[] = [
    {
        name: "My Chain",
        chainId: 2024,
        enabled: true,
        rpcDefault: "http://localhost:2024",
        rpcUrls: {
            default: {
                http: ["http://localhost:2024"],
            },
        },
        testnet: true,
        nativeCurrency: {
            name: "Chain Token",
            symbol: "CTK",
            decimals: 18,
        },
    },
];

//project
export const projects: Project[] = [
    {
        projectId: getUUID(100_200),
        teamId: teams[0].teamId,
        name: "Project 100_200",
        slug: "project-100-200",
        defaultChainId: chainId1337,
    },
    {
        projectId: getUUID(100_201),
        teamId: teams[0].teamId,
        name: "Project 100_201",
        slug: "project-100-201",
        defaultChainId: chainId1337,
    },
    {
        projectId: getUUID(100_202),
        teamId: teams[1].teamId,
        name: "Project 100_202",
        slug: "project-100-202",
        defaultChainId: chainId1337,
    },
];
export const projectUsers: ProjectUser[] = [
    {
        userId: getUUID(100_250),
        email: "johnsmith@example.com",
        fullName: "John Smith",
        externalId: "",
    },
    {
        userId: getUUID(100_251),
        email: "maryjane@test.com",
        fullName: "Mary Jane",
        externalId: "maryJane123",
    },
];
export const projectApiKeys: ProjectApiKey[] = [
    {
        apiKey: getUUID(100_300),
        role: "admin",
    },
];

//Create for each 721/1155
export const projectContracts: ProjectContract[] = flatten([
    // map(erc20s, ({ address }) => {
    //     return {
    //         chainId: chainId1337,
    //         address,
    //         contractName: `ERC20 ${address}`,
    //     };
    // }),
    map(erc721s, ({ address }) => {
        return {
            chainId: chainId1337,
            address,
            collectionContractType: CollectionContractType.ERC721AutoId,
            contractName: `Sports Shoes`,
        };
    }),
    // map(erc1155s, ({ address }) => {
    //     return {
    //         chainId: chainId1337,
    //         address,
    //         collectionContractType: CollectionContractType.ERC1155,
    //         contractName: `ERC1155 ${address}`,
    //     };
    // }),
]);

//Create for each 20/721/1155
export const projectContractMetadatas: ProjectContractMetadata[] = flatten([
    // map(erc20s, (token, i) => {
    //     return {
    //         address: token.address,
    //         chainId: chainId1337,
    //         metadata: {
    //             name: `ERC20 ${i}`,
    //             description: "This is an ERC20 contract.",
    //             image: "https://placehold.co/600x400",
    //             external_url: "https://placehold.co/",
    //         },
    //     } satisfies ProjectContractMetadata;
    // }),
    map(erc721s, (token, i) => {
        return {
            address: token.address,
            chainId: chainId1337,
            metadata: {
                name: `ERC721 ${i}`,
                description: "This is an ERC721 contract.",
                image: "https://placehold.co/600x400",
                external_url: "https://placehold.co/",
            },
        } satisfies ProjectContractMetadata;
    }),
    // map(erc1155s, (token, i) => {
    //     return {
    //         address: token.address,
    //         chainId: chainId1337,
    //         metadata: {
    //             name: `ERC1155 ${i}`,
    //             description: "This is an ERC1155 contract.",
    //             image: "https://placehold.co/600x400",
    //             external_url: "https://placehold.co/",
    //         },
    //     } satisfies ProjectContractMetadata;
    // }),
]);

//Create for each 721/1155
export const projectTokens: ProjectToken[] = flatten([
    map(erc721s, ({ address, metadata, tokenId }) => {
        return {
            chainId: chainId1337,
            address,
            tokenId,
            metadata,
        };
    }),
    // map(erc1155s, ({ address, metadata, id }) => {
    //     return {
    //         chainId: chainId1337,
    //         address,
    //         tokenId: id,
    //         metadata,
    //     };
    // }),
]);

// Assign every token template to the first 721 collection
export const projectTokenTemplates: ProjectTokenTemplate[] = [
    {
        id: getUUID(1),
        chainId: chainId1337,
        address: erc721s[0].address,
        metadata: {
            image: "https://via.assets.so/game.png?id=1&q=95&w=150&h=150&fit=fill",
            name: "Item 1",
            attributes: [
                {
                    trait_type: "Color",
                    value: "red",
                },
            ],
        },
    },
    {
        id: getUUID(2),
        chainId: chainId1337,
        address: erc721s[0].address,
        metadata: {
            image: "https://via.assets.so/game.png?id=2&q=95&w=150&h=150&fit=fill",
            name: "Item 2",
            attributes: [
                {
                    trait_type: "Color",
                    value: "blue",
                },
            ],
        },
    },
];

export const projectUserWalletsDfns: ProjectUserWalletDfns[] = [
    {
        walletId: "100_500",
        userId: users[0].userId,
        address: getAddress(100_500),
        status: DfnsWalletStatus.Active,
    },
];

export const projectUserWalletsSafe: ProjectUserWalletSafe[] = [
    {
        chainId: chainId1337,
        address: getAddress(100_600),
        userId: users[0].userId,
    },
];

export const projectWalletsDfns: ProjectWalletDfns[] = [
    {
        walletId: "100_700",
        address: getAddress(100_700),
        status: DfnsWalletStatus.Active,
    },
];

export const projectWalletsSafe: ProjectWalletSafe[] = [
    {
        chainId: chainId1337,
        address: getAddress(100_800),
    },
];

export function uploadTestData() {
    return Promise.all([
        networkResource.setBatch(networks),
        networkPrivateResource.setBatch(networkPrivates),
        //contractmodels
        // erc20Resource.setBatch(
        //     erc20s.map((e) => {
        //         return { chainId: chainId1337, ...e };
        //     }),
        // ),
        // erc20BalanceResource.setBatch(
        //     erc20Balances.map((e) => {
        //         return { chainId: chainId1337, ...e };
        //     }),
        // ),
        erc721Resource.setBatch(
            erc721s.map((e) => {
                return { chainId: chainId1337, ...e };
            }),
        ),
        // erc1155Resource.setBatch(
        //     erc1155s.map((e) => {
        //         return { chainId: chainId1337, ...e };
        //     }),
        // ),
        // erc1155BalanceResource.setBatch(
        //     erc1155Balances.map((e) => {
        //         return { chainId: chainId1337, ...e };
        //     }),
        // ),
        operatorResource.setBatch(
            operators.map((e) => {
                return { chainId: chainId1337, ...e };
            }),
        ),
        //ethmodels
        ethLogResource.setBatch(
            ethLogs.map((e) => {
                return { chainId: chainId1337, ...e };
            }),
        ),
        ethBlockResource.setBatch(
            ethBlocks.map((e) => {
                return { chainId: chainId1337, ...e };
            }),
        ),
        ethTransactionResource.setBatch(
            ethTransactions.map((e) => {
                return { ...e, chainId: chainId1337 };
            }),
        ),
        //users & teams
        userResource.setBatch(users),
        teamResource.setBatch(teams),
        teamMemberResource.setBatch(
            teamMembers.map((e) => {
                return { teamId: teams[0].teamId, ...e };
            }),
        ),
        teamMemberResource.setBatch(
            teamMembers.map((e) => {
                return { teamId: teams[1].teamId, ...e };
            }),
        ),
        teamNetworkResource.setBatch(
            teamNetworks.map((e) => {
                return { teamId: teams[0].teamId, ...e };
            }),
        ),
        //project
        projectResource.setBatch(projects),
        projectContractResource.setBatch(
            projectContracts.map((e) => {
                return { projectId: projects[0].projectId, ...e };
            }),
        ),
        projectContractResource.setBatch(
            projectContracts.map((e) => {
                return { projectId: projects[1].projectId, ...e };
            }),
        ),
        projectContractMetadataResource.setBatch(
            projectContractMetadatas.map((e) => {
                return { projectId: projects[0].projectId, ...e };
            }),
        ),
        projectTokenResource.setBatch(
            projectTokens.map((e) => {
                return { projectId: projects[0].projectId, ...e };
            }),
        ),
        projectUserResource.setBatch(
            projectUsers.map((e) => {
                return { projectId: projects[0].projectId, ...e };
            }),
        ),
        projectUserWalletDfnsResource.setBatch(
            projectUserWalletsDfns.map((e) => {
                return { projectId: projects[0].projectId, ...e };
            }),
        ),
        projectUserWalletSafeResource.setBatch(
            projectUserWalletsSafe.map((e) => {
                return { projectId: projects[0].projectId, ...e };
            }),
        ),
        projectTokenTemplateResource.setBatch(
            projectTokenTemplates.map((e) => {
                return { projectId: projects[0].projectId, ...e };
            }),
        ),
        projectWalletDfnsResource.setBatch(
            projectWalletsDfns.map((e) => {
                return { projectId: projects[0].projectId, ...e };
            }),
        ),
        projectWalletSafeResource.setBatch(
            projectWalletsSafe.map((e) => {
                return { projectId: projects[0].projectId, ...e };
            }),
        ),
        projectApiKeyResource.setBatch(
            projectApiKeys.map((e) => {
                return { projectId: projects[0].projectId, ...e };
            }),
        ),
    ]);
}
