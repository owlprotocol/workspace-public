import {
    erc721GroupQuery,
    ethTransactionGroupQuery,
    ethTransactionResource,
    ethUserOpGroupQuery,
    ethUserOpResource,
    networkResource,
} from "@owlprotocol/eth-firebase/admin";
import { projectContractGroupQuery } from "../admin/groupQueries.js";
import { teamResource, userResource } from "../admin/resources.js";

export async function analytics() {
    /*
     * * Number of transactions (group query /networks/ethTransactions)
     * Number of contracts
     * Number of NFTs (group query /networks/erc721)
     * Number of users (all users)
     * Number of wallets
     */

    const numTransactionsPromise = ethTransactionGroupQuery.getWhereCount({});
    const numProjectContractsPromise = projectContractGroupQuery.getWhereCount({});
    const numErc721Promise = erc721GroupQuery.getWhereCount({});
    const numUsersPromise = userResource.getWhereCount({});
    const numTeamsPromise = teamResource.getWhereCount({});
    const numUserOpsPromise = ethUserOpGroupQuery.getWhereCount({});

    const [numTransactions, numProjectContracts, numErc721, numUsers, numTeams, numUserOps] = await Promise.all([
        numTransactionsPromise,
        numProjectContractsPromise,
        numErc721Promise,
        numUsersPromise,
        numTeamsPromise,
        numUserOpsPromise,
    ]);

    console.log(`Number of transactions: ${numTransactions}`);
    console.log(`Number of contracts: ${numProjectContracts}`);
    console.log(`Number of NFTs: ${numErc721}`);
    console.log(`Number of users: ${numUsers}`);
    console.log(`Number of teams: ${numTeams}`);
    console.log(`Number of user ops: ${numUserOps}`);

    const networks = await networkResource.getAll();
    const transactionsPerNetworkPromises = networks.map((n) =>
        ethTransactionResource.getWhereCount({ chainId: n.chainId }),
    );
    const userOpsPerNetworkPromises = networks.map((n) => ethUserOpResource.getWhereCount({ chainId: n.chainId }));

    const transactionsPerNetwork = await Promise.all(transactionsPerNetworkPromises);
    const userOpsPerNetowrk = await Promise.all(userOpsPerNetworkPromises);
    const analyticsPerNetwork = networks
        .map((n, idx) => ({
            chainId: n.chainId,
            name: n.name,
            transactions: transactionsPerNetwork[idx],
            userOps: userOpsPerNetowrk[idx],
        }))
        .filter((n) => n.userOps > 0 || n.transactions > 0);

    console.log({ analyticsPerNetwork });
}

export async function main() {
    await analytics();
}

main().catch(console.error);
