import { flatten, groupBy } from "lodash-es";
import { readFileSync } from "fs";
import { ERC20 } from "../models/index.js";
import { erc20Resource } from "../admin/index.js";

const DEFAULT_TOKENS_PATH = "../../../submodules/tokenlists/all_tokens/all.json";

export interface ERC20FromTokenList {
    symbol: string;
    name: string;
    address: string;
    decimals: number;
    chainId: number;
    logoURI: string;
    listedIn: string[];
}

export function uploadERC20s(path = DEFAULT_TOKENS_PATH) {
    const tokensAll: {
        [networkId: string]: ERC20FromTokenList[];
    } = JSON.parse(readFileSync(path, "utf-8"));
    const tokensAllArr = flatten(Object.values(tokensAll));

    const tokens: (ERC20 & { chainId: number })[] = tokensAllArr
        .filter((token) => token.chainId > 0)
        .map((token) => {
            return {
                chainId: token.chainId,
                address: token.address,
                name: token.name,
                symbol: token.symbol,
                decimals: token.decimals,
                logoURI: token.logoURI,
                listedIn: Object.fromEntries(token.listedIn.map((platform) => [platform, true])),
            } as ERC20 & { chainId: number };
        });
    const tokensByChainId = groupBy(tokens, "chainId");

    return Promise.all([Object.values(tokensByChainId).map((value) => erc20Resource.setBatch(value))]);
}
