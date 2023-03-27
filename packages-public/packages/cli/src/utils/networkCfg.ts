import fs from 'fs';
import ethers from 'ethers';
import { Deploy } from '@owlprotocol/contracts';

import { HD_WALLET_MNEMONIC, NETWORK, PRIVATE_KEY_0 } from './environment.js';

export const getNetworkCfg = (network: string = NETWORK!, networksFilePath: string = './networks.json') => {
    let networksFile: string;

    networksFile = fs.readFileSync(networksFilePath).toString();

    const networks = JSON.parse(networksFile);
    const networkCfg: Deploy.RunTimeEnvironment['network'] = networks.network[network];
    if (!networkCfg) {
        throw new Error(`Network ${network} not found in ${networksFilePath}`);
    }

    const jsonRpcEndpoint: string = networkCfg.config.url;
    const provider = new ethers.providers.JsonRpcProvider(jsonRpcEndpoint);

    const signers = new Array<ethers.Wallet>();
    if (HD_WALLET_MNEMONIC) {
        signers[0] = ethers.Wallet.fromMnemonic(HD_WALLET_MNEMONIC);
    } else if (PRIVATE_KEY_0) {
        signers[0] = new ethers.Wallet(PRIVATE_KEY_0);
    } else {
        throw new Error('ENV variable HD_WALLET_MNEMONIC or PRIVATE_KEY_0 must be provided');
    }
    signers[0] = signers[0].connect(provider);

    return {network: networkCfg, signers, provider};
}
