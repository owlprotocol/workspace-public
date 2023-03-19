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

export const describe = `Burns the NFT and all children (if any)

e.g. node dist/index.cjs burnNFT --root=0xbE705Ab239b7CE7c078E84965A518834Cb7CFE4b --tokenId=1



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
            type: 'string',
        })
        .option('tokenId', {
            describe: 'tokenId',
            alias: ['token'],
            type: 'number',
        })
        .demandOption(['rootContractAddr']);
};

export const handler = async (argv: Argv) => {
    console.log(`View ERC721TopDownDna ${argv.rootContractAddr} on ${NETWORK}`);

    debug = !!argv.debug || false;
};
