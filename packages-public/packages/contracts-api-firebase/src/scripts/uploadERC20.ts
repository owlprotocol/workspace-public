import { flatten } from "lodash-es";
import { readFileSync } from "fs";
import { ERC20 } from "../models/contractmodels/ERC20.js";
import { erc20CRUD } from "../admin/crudWrappers.js";

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

    const tokens: ERC20[] = tokensAllArr
        .filter((token) => token.chainId > 0)
        .map((token) => {
            return {
                networkId: `${token.chainId}`,
                address: token.address,
                name: token.name,
                symbol: token.symbol,
                decimals: token.decimals,
                logoURI: token.logoURI,
                listedIn: Object.fromEntries(token.listedIn.map((platform) => [platform, true])),
            };
        });

    return Promise.all([erc20CRUD._setBatch(tokens.slice(0, 10000)), erc20CRUD._setBatch(tokens.slice(10000))]);
}
