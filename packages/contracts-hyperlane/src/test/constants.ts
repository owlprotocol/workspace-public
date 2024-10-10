import { Chain, localhost } from "viem/chains";

export const port = 8553;
export const port2 = 9554;

export const chainId2 = 1338;

export const localhostRemote = { ...localhost, id: chainId2 } as Chain;
