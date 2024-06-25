import { parseEther } from "viem/utils";
import { localhost as localhostViem } from "viem/chains";

export const localhost = {
    chainId: 1337,
    slug: "localhost",
    rpcDefault: "http://127.0.0.1:8545",
    ...localhostViem,
    minUtilityBalance: parseEther("1"),
    targetUtilityBalance: parseEther("1000"),
    minPaymasterBalance: parseEther("1"),
    targetPaymasterBalance: parseEther("10"),
    minRelayerBalance: parseEther("1"),
    targetRelayerBalance: parseEther("10"),
    enabled: true,
    rank: -1,
};
