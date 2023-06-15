import type { AnyAction } from "@reduxjs/toolkit";
import { ContractCustomActions } from "../contract/contracts.js";

export function fetchERC721TopDown(networkId: string, address: string): AnyAction[] {
    const actions: AnyAction[] = [];
    actions.push(
        ContractCustomActions.IERC721TopDown.getChildContracts({
            networkId,
            to: address,
            args: [],
            maxCacheAge: Number.MAX_SAFE_INTEGER,
        }),
    );
    return actions;
}
