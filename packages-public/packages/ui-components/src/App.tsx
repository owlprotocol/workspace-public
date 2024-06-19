import {
    WagmiProvider,
    createConfig,
    useDisconnect,
    useSendTransaction,
    useSignMessage,
} from "wagmi";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import {
    API_REST_BASE_URL,
    CLERK_PUBLISHABLE_KEY,
} from "@owlprotocol/envvars/browser";
import { API_TRPC_BASE_URL } from "@owlprotocol/envvars";
import {
    useUser as useClerkUser,
    SignInButton,
    SignUpButton,
    useClerk,
} from "@clerk/clerk-react";
import { trpc } from "@owlprotocol/core-trpc/react-query";
import { Chain, http, zeroAddress } from "viem";
import { routeTree } from "./routeTree.gen";
import { Button } from "./components/ui/button";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { OwlProvider } from "./components";
import { getConnector } from "./components/wagmi";

const projectId = "7ac177bc-d38f-4c95-a62d-ed6a35adee20";

const router = createRouter({
    routeTree,
});
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const WagmiTest = () => {
    const { signMessage, data } = useSignMessage();
    const { sendTransaction, data: txHash } = useSendTransaction();
    const { disconnect } = useDisconnect();

    // TODO:test user op
    // const [userOpHash, setUserOpHash] = useState<string | undefined>();
    //
    // const sendUserOp = async () => {
    //     const jwt = await session.getToken({ template: "email" });
    //
    //     const smartAccountClient = await getSimpleSmartAccountClient(
    //         jwt,
    //         projectId,
    //         chain as Chain,
    //         API_REST_BASE_URL
    //     );
    //
    //     const callData = await smartAccountClient.account!.encodeCallData({
    //         to: zeroAddress,
    //         value: 0n,
    //         data: "0x",
    //     });
    //
    //     const gasPrices = await bundlerClient.getUserOperationGasPrice();
    //
    //     const userOperation =
    //         await smartAccountClient.prepareUserOperationRequest({
    //             userOperation: {
    //                 callData, // callData is the only required field in the partial user operation
    //                 maxFeePerGas: gasPrices.fast.maxFeePerGas,
    //                 maxPriorityFeePerGas: gasPrices.fast.maxPriorityFeePerGas,
    //             },
    //         });
    //
    //     const userOpHash = await bundlerClient.sendUserOperation({
    //         userOperation,
    //     });
    //     setUserOpHash(userOpHash);
    // };
    //
    // const { session } = useSession();
    //
    // const [chain] = trpc.network.get.useSuspenseQuery({ chainId: 1337 });
    //
    // const bundlerClient = createPimlicoBundlerClient({
    //     transport: getOwlRpcTransport(chain.id, API_REST_BASE_URL),
    //     entryPoint: ENTRYPOINT_ADDRESS_V07,
    // });

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

            {/* TODO: test user op
            <Button onClick={() => sendUserOp()}>Send User Op</Button>

            <p>{!!userOpHash && `User Op Hash: ${userOpHash}`}</p>

            <br />*/}

            <Button onClick={() => disconnect()}>Disconnect</Button>
        </>
    );
};

//TODO: Deprecate this as no longer using this pattern
const InnerApp = () => {
    const clerkUserStatus = useClerkUser();
    const {
        isSignedIn: clerkSignedIn,
        isLoaded: clerkIsLoaded,
        user,
    } = clerkUserStatus;
    const userId = user?.id;
    const currentUrl: string = location.href || "";

    const [localChain] = trpc.network.get.useSuspenseQuery({ chainId: 1337 });
    const chains = [localChain] as readonly [Chain, ...Chain[]];

    const owlConnector = getConnector({
        owlClerk: useClerk(),
        projectId,
        owlApiRestBaseUrl: API_REST_BASE_URL,
    });
    // const owlConfig = getDefaultConfig({chainIds: [1337], owlClerk: useClerk(), projectId: "67cecef1-5b79-42c2-aa30-36e261a263d4"})
    const owlConfig = createConfig({
        chains,
        connectors: [owlConnector],
        transports: { [localChain.id]: http("http://localhost:8545") },
    });

    return (
        <>
            <RouterProvider router={router} />
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

            <WagmiProvider config={owlConfig}>
                <WagmiTest />
            </WagmiProvider>
        </>
    );
};

export const App = () => {
    return (
        <>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                {/* <InnerAppWithTRPC /> */}
                <OwlProvider
                    clerkPublishableKey={CLERK_PUBLISHABLE_KEY}
                    apiTrpcBaseUrl={API_TRPC_BASE_URL}
                >
                    <InnerApp />
                </OwlProvider>
                <Toaster />
            </ThemeProvider>
        </>
    );
};
