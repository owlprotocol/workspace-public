import {
    WagmiProvider,
    createConfig,
    useDisconnect,
    useSendTransaction,
    useSignMessage,
} from "wagmi";
import { API_REST_BASE_URL } from "@owlprotocol/envvars/browser";
import {
    useUser as useClerkUser,
    SignInButton,
    SignUpButton,
    useClerk,
    useSession,
} from "@clerk/clerk-react";
import { trpc } from "@owlprotocol/core-trpc/react-query";
import { Chain, http, zeroAddress } from "viem";
import {
    ConnectButton,
    RainbowKitProvider,
    connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { getUserSimpleSmartAccountClient } from "@owlprotocol/core-provider";
import { Button } from "../components/ui/button.js";
import "@rainbow-me/rainbowkit/styles.css";
import { getOwlWallet } from "../components/rainbowKit/walletConnector.js";

export interface MyWalletOptions {
    projectId: string;
}

const projectId = "00000000-0000-0000-0000-000000100200";

export const Route = createFileRoute("/rainbowKit")({
    component: RainbowKit,
});

const WagmiTest = () => {
    const { signMessage, data } = useSignMessage();
    const { sendTransaction, data: txHash } = useSendTransaction();
    const { disconnect } = useDisconnect();

    const [userOpTransactionHash, setUserOpTransactionHash] = useState<
        string | undefined
    >();

    const [localChain] = trpc.network.get.useSuspenseQuery({ chainId: 1337 });

    const { session } = useSession();

    const sendUserOp = async () => {
        const jwt = await session.getToken({ template: "email" });

        const smartAccountClient = await getUserSimpleSmartAccountClient(
            jwt,
            projectId,
            localChain as Chain,
            API_REST_BASE_URL
        );

        const callData = await smartAccountClient.account!.encodeCallData({
            to: zeroAddress,
            value: 0n,
            data: "0x",
        });

        const userOperation =
            await smartAccountClient.prepareUserOperationRequest({
                userOperation: {
                    callData, // callData is the only required field in the partial user operation
                },
            });

        const userOpTransactionHash =
            await smartAccountClient.sendUserOperation({
                userOperation,
            });
        setUserOpTransactionHash(userOpTransactionHash);
    };

    return (
        <>
            <Button onClick={() => signMessage({ message: "hello world" })}>
                Sign message
            </Button>

            <p>{!!data && `Signed Message: ${data}`}</p>

            <br />

            <Button
                onClick={() =>
                    sendTransaction({
                        to: zeroAddress,
                        value: 0n,
                        data: "0x",
                    })
                }
            >
                Send transaction (not risky, I promise)
            </Button>

            <p>{!!txHash && `Transaction Hash: ${txHash}`}</p>

            <br />

            <Button onClick={() => sendUserOp()}>Send User Op</Button>

            <p>
                {!!userOpTransactionHash &&
                    `User Op included in transaction: ${userOpTransactionHash}`}
            </p>

            <br />

            <Button onClick={() => disconnect()}>Disconnect</Button>

            <br />
            <ConnectButton />
        </>
    );
};

function RainbowKit() {
    const clerkUserStatus = useClerkUser();
    const {
        isSignedIn: clerkSignedIn,
        isLoaded: clerkIsLoaded,
        user,
    } = clerkUserStatus;
    const userId = user?.id;

    const [localChain] = trpc.network.get.useSuspenseQuery({ chainId: 1337 });
    const chains = [localChain] as readonly [Chain, ...Chain[]];

    const router = useRouterState();
    const currentUrl = router.location.pathname;

    const clerk = useClerk();

    const owlWallet = getOwlWallet({
        owlClerk: clerk,
        projectId,
        owlApiRestBaseUrl: API_REST_BASE_URL,
        forceRedirectUrl: currentUrl,
    });

    const connectors = connectorsForWallets(
        [
            {
                groupName: "Recommended",
                wallets: [owlWallet],
            },
        ],
        { projectId: "owlProtocol", appName: "Owl Protocol Storybook" }
    );

    const config = createConfig({
        chains,
        connectors,
        transports: { [localChain.id]: http("http://localhost:8545") },
    });

    return (
        <>
            <h1>Hello</h1>
            <p>{userId}</p>
            {clerkIsLoaded && !clerkSignedIn && (
                <>
                    <SignInButton mode="modal" fallbackRedirectUrl={currentUrl}>
                        <Button className="w-full text-xl py-6">Sign in</Button>
                    </SignInButton>
                    <SignUpButton mode="modal" fallbackRedirectUrl={currentUrl}>
                        <Button className="w-full text-xl py-6">Sign up</Button>
                    </SignUpButton>
                </>
            )}

            <WagmiProvider config={config}>
                <RainbowKitProvider>
                    <WagmiTest />
                </RainbowKitProvider>
            </WagmiProvider>
        </>
    );
}
