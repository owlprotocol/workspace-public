import type { AnyAction } from "@reduxjs/toolkit";
import { ContractActionHelpers } from "./contracts.js";

export function fetchERC20(networkId: string, address: string, account: string | undefined | null): AnyAction[] {
    const actions: AnyAction[] = [];
    if (account) {
        actions.push(
            ContractActionHelpers.IERC20.balanceOf({
                networkId,
                to: address,
                args: [account],
            }),
        );
    }
    return actions;
}
