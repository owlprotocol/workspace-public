import yargs from 'yargs';
import lodash from 'lodash';
import { Argv } from '../utils/pathHandlers.js';
import { HD_WALLET_MNEMONIC, NETWORK, PRIVATE_KEY_0 } from '../utils/environment.js';
import { ethers, utils } from 'ethers';
import fetchRetryWrapper from 'fetch-retry';

const { mapValues } = lodash;
const fetchRetry = fetchRetryWrapper(fetch);

import { Utils, Deploy, Artifacts } from '@owlprotocol/contracts';
import config from 'config';
import { NFTGenerativeCollectionClass } from '@owlprotocol/nft-sdk';

const jsonRpcEndpoint: string = config.get(`network.${NETWORK}.config.url`);
const provider = new ethers.providers.JsonRpcProvider(jsonRpcEndpoint);
let debug = false;

export const command = 'detachTopDown';

export const describe = `Detach a child NFT from a parent NFT at the given token id.
`;

export const example = 'node dist/index.cjs detachTopDown -r <rootContractAddr> -c <childContractAddr> --tokenId=<id>';
export const exampleDescription =
    'detaches the child NFT of <childContractAddr> from the <rootContractAddr> NFT with tokenId <id>';

export const builder = (yargs: ReturnType<yargs.Argv>) => {
    return yargs
        .option('debug', {
            describe: 'Output debug statements',
            type: 'boolean',
        })
        .option('rootContractAddr', {
            describe: 'Parent/root contract address',
            alias: ['r', 'root'],
            type: 'string',
        })
        .option('childContractAddr', {
            describe: 'Child contract address for the NFT to detach',
            alias: ['c', 'child'],
            type: 'string',
        })
        .option('tokenId', {
            describe: 'tokenId of the parent/root NFT',
            type: 'number',
        })
        .demandOption(['rootContractAddr', 'childContractAddr', 'tokenId']);
};

export const handler = async (argv: Argv) => {
    console.log(`Detaching from ERC721TopDownDna on ${NETWORK}`);

    // argvCheck(argv);
    // TODO: consider LOG_LEVEL
    debug = !!argv.debug || false;

    const signers = new Array<ethers.Wallet>();
    if (HD_WALLET_MNEMONIC) {
        signers[0] = ethers.Wallet.fromMnemonic(HD_WALLET_MNEMONIC);
    } else if (PRIVATE_KEY_0) {
        signers[0] = new ethers.Wallet(PRIVATE_KEY_0);
    } else {
        throw new Error('ENV variable HD_WALLET_MNEMONIC or PRIVATE_KEY_0 must be provided');
    }
    signers[0] = signers[0].connect(provider);
    const network: Deploy.RunTimeEnvironment['network'] = config.get(`network.${NETWORK}`);

    const rootContractAddr = argv.rootContractAddr as string;
    const childContractAddr = argv.childContractAddr as string;
    const tokenId = argv.tokenId as number;

    const rootContract = new ethers.Contract(rootContractAddr, Artifacts.ERC721TopDownDna.abi, signers[0]);

    await detachTopDown({ provider, signers, network }, rootContract, childContractAddr, tokenId);

    const fullDna = await rootContract.getDna(tokenId);
    const contractURI = await rootContract.contractURI();

    let collMetadataRes;
    try {
        debug && console.debug(`Fetching JSON Schema from ${contractURI}`);
        collMetadataRes = await fetchRetry(contractURI, { retryDelay: 200 });
    } catch (err) {
        console.error(`Fetch Collection JSON Schema failed`);
        throw err;
    }

    if (!collMetadataRes.ok) {
        console.error(`Error fetching ${contractURI}`);
        process.exit();
    }

    const collMetadata = await collMetadataRes.json();

    const collectionClass = NFTGenerativeCollectionClass.fromData(collMetadata);

    if (debug) {
        const [dna, fullDnaChildren] = utils.defaultAbiCoder.decode(['bytes', 'bytes[]'], fullDna);

        console.debug(dna);
        console.debug(fullDnaChildren);
        console.debug(fullDna);
    }

    const nftItem = collectionClass.createFromFullDna(fullDna);

    const attrWithChildren = nftItem.attributesFormattedWithChildren();

    console.log(nftItem.attributesFormatted());
    mapValues(attrWithChildren.children, (c: any, k) => {
        console.log(k, c.attributes);
    });

    console.log('Done');
};

const detachTopDown = async (
    { provider, signers, network }: Deploy.RunTimeEnvironment,
    rootContract: any,
    childContractAddr: string,
    tokenId: number,
) => {
    const tx = await rootContract.setChildren(
        ...Utils.ERC721TopDownDna.flattenSetChildrenArgsERC721TopDownDna({
            tokenId,
            childContracts721Set: [childContractAddr],
            childTokenIds721Set: [0],
        }),
        {
            gasPrice: 2e9,
            gasLimit: 10e6,
        },
    );

    return tx.wait(1);
};
