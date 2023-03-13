import yargs from 'yargs';
import _ from 'lodash';

import { Argv } from '../utils/pathHandlers.js';
import { HD_WALLET_MNEMONIC, NETWORK, PRIVATE_KEY_0 } from '../utils/environment.js';

import { ethers } from 'ethers';

const { mapValues } = _;

import { Artifacts, Deploy } from '@owlprotocol/contracts';
import config from 'config';

const jsonRpcEndpoint: string = config.get(`network.${NETWORK}.config.url`);
const provider = new ethers.providers.JsonRpcProvider(jsonRpcEndpoint);
let debug = false;

import { NFTGenerativeCollectionClass, NFTGenerativeItemClass } from '@owlprotocol/nft-sdk';

export const command = 'viewTopDown';

export const describe = `Introspect and view the NFT TopDownDna contract

e.g. node dist/index.cjs viewTopDown --root=0xbE705Ab239b7CE7c078E84965A518834Cb7CFE4b --tokenId=1



`;

export const builder = (yargs: ReturnType<yargs.Argv>) => {
    return yargs
        .option('debug', {
            describe: 'Outputs debug statements',
            type: 'boolean',
        })
        .option('rootContractAddr', {
            describe: 'Parent/root contract address',
            alias: ['r', 'root'],
            type: 'string'
        })
        .option('tokenId', {
            describe: 'tokenId',
            alias: ['token'],
            type: 'number'
        })
        .demandOption(['rootContractAddr']);
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

    const rootContract = new ethers.Contract(rootContractAddr, Artifacts.ERC721TopDownDna.abi, signers[0]);
    const contractURI = await rootContract.contractURI();

    console.log(`Fetching Metadata Schema JSON from: ${contractURI}`);
    const collMetadataRes = await fetch(contractURI);

    if (!collMetadataRes.ok) {
        console.error(`Error fetching ${contractURI}`);
        process.exit();
    }

    const collMetadata = await collMetadataRes.json();

    const collectionClass = NFTGenerativeCollectionClass.fromData(collMetadata);

    debug && console.debug(collectionClass);

    const fullDna = await rootContract.getDna(tokenId);
    const nftItem = collectionClass.createFromFullDna(fullDna);

    const attrWithChildren = nftItem.attributesFormattedWithChildren();

    console.log(nftItem.attributesFormatted());
    mapValues(attrWithChildren.children, (c: any, k) => {
        console.log(k, c.attributes);
    });

    debug && console.log('tokenUri', await rootContract.tokenURI(tokenId));
    debug && console.debug('fullDna', fullDna);
}
