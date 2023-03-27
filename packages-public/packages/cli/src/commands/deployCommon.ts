import yargs from 'yargs';
import config from 'config';
import {ethers} from 'ethers';
import {Deploy} from '@owlprotocol/contracts';
import {HD_WALLET_MNEMONIC, PRIVATE_KEY_0, NETWORK} from '../utils/environment.js';

const jsonRpcEndpoint: string = config.get(`network.${NETWORK}.config.url`);
const provider = new ethers.providers.JsonRpcProvider(jsonRpcEndpoint);

export type DeployCommonResult = {
    proxyFactory?: any;
    deterministicDeployer?: any;
    implementations?: any;
    upgradeableBeacon?: any;
};

export const command = 'deployCommon';

export const describe = `Deploy the base smart contracts:
- Deterministic Deployer
- Proxy Factory
- Implementations of all our smart contracts
- UpgradeableBeacon

`;

export const example = 'node dist/index.cjs deployCommon';
export const exampleDescription = 'deploys the base smart contracts';

export const builder = (yargs: ReturnType<yargs.Argv>) => {
    return yargs.option('debug', {
        describe: 'Outputs debug statements',
        type: 'boolean',
    });
};

export const handler = async (argv: yargs.ArgumentsCamelCase) => {
    const debug = argv.debug || false;

    console.log(`Deploying Common Beacons and Implementations to ${NETWORK}`);

    const signers: Array<ethers.Wallet> = [];

    let walletOne: ethers.Wallet;
    if (HD_WALLET_MNEMONIC) {
        walletOne = ethers.Wallet.fromMnemonic(HD_WALLET_MNEMONIC);
    } else if (PRIVATE_KEY_0) {
        walletOne = new ethers.Wallet(PRIVATE_KEY_0);
    } else {
        throw new Error('ENV variable HD_WALLET_MNEMONIC or PRIVATE_KEY_0 must be provided');
    }
    const network: Deploy.RunTimeEnvironment['network'] = config.get(`network.${NETWORK}`);

    signers[0] = walletOne.connect(provider);

    const deployCommonResult = await deployCommon({provider, signers, network});
    debug && console.debug(deployCommonResult);

    console.log('Done');
};

export const deployCommon = async ({
    provider,
    signers,
    network,
}: Deploy.RunTimeEnvironment): Promise<DeployCommonResult> => {
    const deployCommonResult: DeployCommonResult = {};

    deployCommonResult.deterministicDeployer = await Deploy.DeterministicDeployerDeploy({
        provider,
        signers,
        network,
    });
    deployCommonResult.proxyFactory = await Deploy.ProxyFactoryDeploy({provider, signers, network});
    deployCommonResult.implementations = await Deploy.ImplementationsDeploy({provider, signers, network});
    deployCommonResult.upgradeableBeacon = await Deploy.UpgradeableBeaconDeploy({provider, signers, network});

    return deployCommonResult;
};
