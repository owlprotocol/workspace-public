import { createContext } from "react";
import { FormattedToken, FormattedCollectibe } from "./WalletHomeView.js";

type ViewType =
    | "HOME"
    | "SIGN_IN"
    | "RECEIVE"
    | "TRANSACTION_CREATE"
    | "TRANSACTION_CONFIRM"
    | "TRANSACTION_RESULT"
    | "COLLECTIBLES"
    | "SEND_COLLECTIBLE"
    | "CONFIRM_SEND_COLLECTIBLE"
    | "CONFIRMED";

interface WalletState {
    view: ViewType;
    sendTransaction?: SendTransactionData;
    allAvailableTokens?: FormattedToken[];
    selectedToken?: FormattedToken;
    allCollectibles?: FormattedCollectibe[];
    selectedCollectible?: FormattedCollectibe;
    formValues?: WalletFormValues;
    sendAssets?: SendTransactionData;
    transferStatus?: {
        status: "idle" | "success" | "failure";
        txHash?: string;
    };
}

interface SendTransactionData {
    sendTo?: string;
    sendAmount?: string;
    txHash?: string;
    txData?: string;
    error?: string;
}

interface WalletFormValues {
    walletAddress: string;
    amount: number;
}

type WalletAction =
    | { type: "SET_VIEW"; data: ViewType }
    | { type: "SET_SEND_TRANSACTION"; data: SendTransactionData }
    | { type: "SET_SEND_TRANSACTION_TXHASH"; data: string }
    | { type: "SET_SEND_TRANSACTION_ERROR"; data: string }
    | { type: "SET_SELECTED_COLLECTIBLE"; data: any }
    | { type: "SET_SELECTED_TOKEN"; data: FormattedToken }
    | { type: "SET_FORM_VALUES"; data: WalletFormValues }
    | {
          type: "SET_TRANSFER_STATUS";
          data: { status: "idle" | "success" | "failure"; txHash?: string };
      }
    | { type: "SET_TOKEN_DETAILS"; data: FormattedToken[] };

export const WalletInitialState: WalletState = {
    view: "HOME",
};

//Initialize context and pass initial values for state and dispatch
export const WalletContext = createContext<[WalletState, React.Dispatch<WalletAction>]>([
    WalletInitialState,
    () => null,
]);

export const walletReducer = (state: WalletState, action: WalletAction): WalletState => {
    switch (action.type) {
        case "SET_VIEW":
            return {
                ...state,
                view: action.data,
            };
        case "SET_SEND_TRANSACTION":
            return {
                ...state,
                sendTransaction: action.data,
            };
        case "SET_SEND_TRANSACTION_TXHASH":
            return {
                ...state,
                sendTransaction: {
                    ...state.sendTransaction,
                    txHash: action.data,
                },
            };
        case "SET_SEND_TRANSACTION_ERROR":
            return {
                ...state,
                sendTransaction: {
                    ...state.sendTransaction,
                    error: action.data,
                },
            };
        case "SET_SELECTED_TOKEN":
            return {
                ...state,
                selectedToken: action.data,
            };
        case "SET_SELECTED_COLLECTIBLE":
            return {
                ...state,
                selectedCollectible: action.data,
            };
        case "SET_FORM_VALUES":
            return {
                ...state,
                formValues: action.data,
            };
        case "SET_TRANSFER_STATUS":
            return {
                ...state,
                transferStatus: action.data,
            };
        case "SET_TOKEN_DETAILS":
            return {
                ...state,
                allAvailableTokens: action.data,
            };
        default:
            return state;
    }
};
