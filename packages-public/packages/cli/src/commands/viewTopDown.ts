import yargs from 'yargs';
import lodash from 'lodash';
import { Argv } from '../utils/pathHandlers.js';
import { HD_WALLET_MNEMONIC, NETWORK, PRIVATE_KEY_0 } from '../utils/environment.js';

import { ethers } from 'ethers';

import { Artifacts } from '@owlprotocol/contracts';
import config from 'config';

const { mapValues } = lodash;

const jsonRpcEndpoint: string = config.get(`network.${NETWORK}.config.url`);
const provider = new ethers.providers.JsonRpcProvider(jsonRpcEndpoint);
let debug = false;

import { NFTGenerativeCollectionClass, NFTGenerativeItemInterface } from '@owlprotocol/nft-sdk';

export const command = 'viewTopDown';

export const describe = `View an NFT's DNA and attributes, and that of its children.
`;

export const example = 'node dist/index.cjs viewTopDown -r <rootContractAddr> --tokenId=<id>';
export const exampleDescription =
    'view the DNA and attributes of the NFT at <rootContractAddr> with token id <id>, and that of its children';

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
        .option('tokenId', {
            describe: 'tokenId',
            alias: ['token'],
            type: 'number',
        })
        .demandOption(['rootContractAddr', 'tokenId']);
};

export const handler = async (argv: Argv) => {
    console.log(`View ERC721TopDownDna ${argv.rootContractAddr} on ${NETWORK}`);

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

    const rootContractAddr = argv.rootContractAddr as string;
    const tokenId = argv.tokenId as number;

    const rootContract = new ethers.Contract(rootContractAddr, Artifacts.ERC721TopDownDnaMintable.abi, signers[0]);
    const contractURI = await rootContract.contractURI();

    console.log(`Fetching Metadata JSON Schema from: ${contractURI}`);
    const collMetadataRes = await fetch(contractURI);

    if (!collMetadataRes.ok) {
        console.error(`Error fetching ${contractURI}`);
        process.exit();
    }

    const collMetadata = await collMetadataRes.json();

    const collectionClass = NFTGenerativeCollectionClass.fromData(collMetadata);

    debug && console.debug(collectionClass);

    const fullDnaWithChildren = await rootContract.getDna(tokenId);
    const nftItem = collectionClass.createFromFullDna(fullDnaWithChildren);

    const owner = (await rootContract.ownerOf(tokenId)) as string;

    dumpInfoNFT(tokenId, owner, nftItem);

    debug && console.log('tokenUri', await rootContract.tokenURI(tokenId));
    debug && console.debug('fullDnaWithChildren', fullDnaWithChildren);
};

const dumpInfoNFT = (tokenId: number, owner: string, nftItem: NFTGenerativeItemInterface) => {
    console.log(`NFT tokenId: ${tokenId} - owned by ${owner}`);

    const attrWithChildren = nftItem.attributesFormattedWithChildren();

    console.log(nftItem.attributesFormatted());
    mapValues(attrWithChildren.children, (c: any, k) => {
        console.log(k, c.attributes);
    });
};
