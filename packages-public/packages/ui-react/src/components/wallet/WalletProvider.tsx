import { ReactNode, useReducer } from "react";
import { WalletContext, WalletInitialState, walletReducer } from "./walletContextUtils.js";

interface WalletProviderProps {
    children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(walletReducer, WalletInitialState);

    return <WalletContext.Provider value={[state, dispatch]}>{children}</WalletContext.Provider>;
};
