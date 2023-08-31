import { BalancesDeploy } from "../deploy/Balances.js";
import { HRE } from "../utils.js";

const deploy = async ({ ethers, network }: HRE) => {
    await BalancesDeploy({ provider: ethers.provider, network });
    return;
};

deploy.tags = BalancesDeploy.tags;
deploy.dependencies = BalancesDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
