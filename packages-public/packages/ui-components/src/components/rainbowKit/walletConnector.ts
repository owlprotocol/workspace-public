import { Wallet, WalletDetailsParams } from "@rainbow-me/rainbowkit";
import { createConnector } from "wagmi";
import { OwlConnectorParameters, getConnector } from "../wagmi/index.js";

export const getOwlWallet = (
    owlConnectorParameters: OwlConnectorParameters
): (() => Wallet) => {
    return () => ({
        id: "owlProtocol",
        name: "Owl Protocol",
        iconUrl: "https://dashboard.owlprotocol.xyz/logo_on_purple-256.png",
        iconBackground: "#fff",
        createConnector: (walletDetails: WalletDetailsParams) => {
            const connector = getConnector({
                ...owlConnectorParameters,
            });
            return createConnector((config) => ({
                ...connector(config),
                ...walletDetails,
            }));
        },
    });
};
