import {
    Box,
    Button,
    Card,
    Flex,
    Grid,
    HStack,
    Heading,
    IconButton,
    Image,
    Skeleton,
    Spinner,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
    useBreakpointValue,
    useClipboard,
    useColorMode,
    useToast,
} from "@chakra-ui/react";
import { useUser } from "@clerk/clerk-react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { trpc } from "@owlprotocol/contracts-api-client-trpc/react";
import { NetworkReadOnly, SafeWalletId, SafeWalletReadOnly, TokenMetadata } from "@owlprotocol/contracts-api-firebase";
import {
    erc1155BalanceHooks,
    erc20BalanceReadOnlyHooks,
    erc721Hooks,
    networksReadOnlyHooks,
    safeWalletsReadOnlyHooks,
} from "@owlprotocol/contracts-api-firebase/hooks";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ethers, utils } from "ethers";
import { useCallback, useContext, useEffect, useState } from "react";
import { CiImageOff } from "react-icons/ci";
import { WalletContext } from "./walletContextUtils.js";
import { CopyButton, FirebaseSigninContext, TanstackTable, truncateAddress } from "../../index.js";
import logo from "../../../public/logo_cropped.png";

export const WalletHomeView = () => {
    const [, dispatch] = useContext(WalletContext);
    const safeWalletDeployMutation = trpc.safe.deploy.useMutation();
    const { trpcToken } = useContext(FirebaseSigninContext);

    const { colorMode } = useColorMode();
    const lightMode = colorMode === "light";

    const { user } = useUser();
    const userId = user?.id;
    const [chainId] = useLocalStorage<number>("chainId");

    const [safeWallet, safeWalletOptions] = safeWalletsReadOnlyHooks.useGetWhereFirst(
        chainId && userId
            ? {
                  owner: userId,
                  networkId: chainId.toString(),
              }
            : // TODO: replace with an empty object when firebase crud is fixed
              { owner: "fixme" },
    );
    const safeAddress = safeWallet?.address;

    const handleSafeWalletDeploy = useCallback(async () => {
        if (chainId && trpcToken) {
            try {
                safeWalletDeployMutation.mutate({
                    networkId: chainId.toString(),
                });
            } catch (e) {
                // TODO: show the error in the UI
                console.error(e);
            }
        }
    }, [chainId, trpcToken]);

    const [network] = networksReadOnlyHooks.useGet(chainId?.toString());

    const { data: nativeTokenBalance, isLoading } = trpc.safe.safeInfo.safeBalance.useQuery(
        {
            networkId: chainId?.toString(),
        },
        {
            enabled:
                !!chainId &&
                !!trpcToken &&
                !!safeWallet &&
                // Run safeBalance query if safeWallet networkId matches selected chainId
                safeWallet.networkId === chainId.toString(),
        },
    );

    //TODO: set to real value
    const currencySymbol = network?.nativeCurrency?.symbol ?? "ETH";

    // Use formatEther to format the value
    const nativeTokenFormatted = `${utils.formatEther(nativeTokenBalance?.balance || "0").slice(0, 6)}`;

    //Value of type string required for `useClipboard`
    const { onCopy } = useClipboard(safeWallet?.address || "");
    const toast = useToast();
    const copySafeWallet = () => {
        onCopy();
        toast({
            title: "Safe Wallet Address Copied to Clipboard",
            description: "",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
        });
    };

    const handleSend = () => {
        dispatch({ type: "SET_VIEW", data: "TRANSACTION_CREATE" });
    };

    const handleReceive = () => {
        dispatch({ type: "SET_VIEW", data: "RECEIVE" });
    };

    if (safeWalletOptions.status === "error") {
        return (
            <Text pt={5} color="error.200">
                An error occurred while getting your safe wallet. Please try again.
            </Text>
        );
    }

    if (!safeWallet) {
        return (
            <>
                <Button
                    mt={10}
                    borderRadius={50}
                    variant="primary"
                    onClick={handleSafeWalletDeploy}
                    isDisabled={!trpcToken}
                    minW="143px"
                    height="40px"
                >
                    {safeWalletDeployMutation.isLoading ? (
                        <Spinner />
                    ) : safeWallet ? (
                        "Network Enabled"
                    ) : (
                        "Enable Network"
                    )}
                </Button>
                {safeWalletDeployMutation.isError && (
                    <Text pt={5} color="error.200">
                        An error occurred deploying the network. Please try again.
                    </Text>
                )}
            </>
        );
    }

    return (
        <>
            <Flex justifyContent="center" alignItems="center" gap={2}>
                <Skeleton isLoaded={!isLoading}>
                    <Heading height="44px">{nativeTokenFormatted}</Heading>
                </Skeleton>
                <Heading>{currencySymbol}</Heading>
            </Flex>
            <Flex gap={2} justifyContent="center" alignItems="center" color="baseText">
                <Text>{truncateAddress(safeWallet?.address)}</Text>
                <Box
                    p="5px"
                    borderRadius={5}
                    _hover={{
                        cursor: "pointer",
                        bgColor: "baseBg",
                    }}
                >
                    <CopyButton onCopy={copySafeWallet} />
                </Box>
            </Flex>
            <HStack spacing={12} pt={12} justifyContent="space-between">
                <VStack>
                    <IconButton
                        variant="walletAction"
                        aria-label="send"
                        minW="60px"
                        onClick={handleSend}
                        icon={<Image src={`/send${lightMode ? "" : "-white"}.svg`} />}
                    />
                    <Text as="b">Send</Text>
                </VStack>
                <VStack>
                    <IconButton
                        variant="walletAction"
                        aria-label="send"
                        minW="60px"
                        onClick={handleReceive}
                        icon={<Image src={`/qr_code${lightMode ? "" : "-white"}.svg`} />}
                    />

                    <Text as="b">Receive</Text>
                </VStack>
            </HStack>
            <Tabs variant="rounded" isFitted>
                <TabList>
                    {/* TODO: bring back activity once transaction model fixed */}
                    {/* <Tab>Activity</Tab> */}
                    <Tab>Tokens</Tab>
                    <Tab>Collectibles</Tab>
                </TabList>

                <TabPanels
                    backgroundColor="baseBg"
                    color="baseText"
                    mt={6}
                    p={0}
                    w="100%"
                    borderRadius={10}
                    justifyContent="center"
                    alignItems="center"
                >
                    {/* TODO: bring back activity once transaction model fixed */}
                    {/* <TabPanel>
                        <Flex
                            direction="column"
                            maxH="300px"
                            overflowY="scroll"
                            sx={{
                                "&::-webkit-scrollbar": {
                                    display: "none", // Chrome
                                },
                                msOverflowStyle: "none", // IE and Edge
                                scrollbarWidth: "none", // Firefox
                            }}
                        >
                            <WalletActivity />
                        </Flex>
                    </TabPanel> */}

                    <TabPanel p={0}>
                        <Flex
                            direction="column"
                            maxH="300px"
                            overflowY="scroll"
                            sx={{
                                "&::-webkit-scrollbar": {
                                    display: "none" /* Chrome */,
                                },
                                msOverflowStyle: "none" /* IE and Edge */,
                                scrollbarWidth: "none" /* Firefox */,
                            }}
                        >
                            {chainId && network && safeAddress ? (
                                <TokensPreview chainId={chainId} network={network} safeAddress={safeAddress} />
                            ) : (
                                <Spinner />
                            )}
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex
                            direction="column"
                            maxH="300px"
                            overflowY="scroll"
                            sx={{
                                "&::-webkit-scrollbar": {
                                    display: "none" /* Chrome */,
                                },
                                msOverflowStyle: "none" /* IE and Edge */,
                                scrollbarWidth: "none" /* Firefox */,
                            }}
                        >
                            {safeWallet && chainId ? (
                                <CollectiblesPreview safeWallet={safeWallet} chainId={chainId} />
                            ) : (
                                <Spinner />
                            )}
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
};

const NoActivity = ({ section }: { section: string }) => {
    const { colorMode } = useColorMode();
    const lightMode = colorMode === "light";
    return (
        <Flex direction="column" justifyContent="center" alignItems="center">
            <Image src={`/sadGlobe${lightMode ? "" : "-white"}.svg`} h={90} w={90} />
            No {section}...
        </Flex>
    );
};

const tokenColumnHelper = createColumnHelper<FormattedToken>();

function getTokenTableColumns(
    logo: string,
    handleRowClick: (row: FormattedToken) => void,
): Array<ColumnDef<FormattedToken, any>> {
    return [
        tokenColumnHelper.accessor((row: FormattedToken) => row.name, {
            id: "name",
            header: "Name",
            cell: (info) => (
                <Flex
                    direction="row"
                    textAlign="center"
                    alignItems="center"
                    onClick={() => handleRowClick(info.row.original)}
                    fontWeight="bold"
                >
                    <Image src={logo} w={10} h={10} mr={4} />
                    {info.getValue()}
                </Flex>
            ),
        }),
        tokenColumnHelper.accessor((row: FormattedToken) => row.formattedBalance, {
            id: "amount",
            header: "Amount",
            cell: (info) => <div>{info.getValue() + " " + info.row.original.symbol}</div>,
        }),
    ];
}

// safeAddress, chainId and network must be defined
export const TokensPreview = ({
    safeAddress,
    chainId,
    network,
}: {
    safeAddress: string;
    chainId: number;
    network: NetworkReadOnly;
}) => {
    const { trpcToken } = useContext(FirebaseSigninContext);
    const [{ allAvailableTokens }, dispatch] = useContext(WalletContext);

    const { data: nativeTokenBalance } = trpc.safe.safeInfo.safeBalance.useQuery(
        {
            networkId: chainId.toString(),
        },
        { enabled: !!trpcToken },
    );
    const nativeTokenBalanceFormatted = utils.formatEther(nativeTokenBalance?.balance || "0").slice(0, 6);
    const nativeTokenName = network?.nativeCurrency?.name ?? "Testnet";
    const nativeTokenSymbol = network?.nativeCurrency?.symbol ?? "ETH";
    const nativeTokenDecimals = network?.nativeCurrency?.decimals ?? 18;

    const nativeToken = {
        networkId: chainId.toString(),
        name: nativeTokenName,
        symbol: nativeTokenSymbol,
        balance: nativeTokenBalanceFormatted,
        formattedBalance: nativeTokenBalanceFormatted,
        address: nativeTokenName,
        account: safeAddress!,
        type: "Native" as const,
        logo: network?.icon?.url,
        decimals: nativeTokenDecimals,
    };
    const [erc20] = erc20BalanceReadOnlyHooks.useGetWhere({
        networkId: chainId.toString(),
        account: safeAddress,
    });

    useEffect(() => {
        if (erc20) {
            const provider = new ethers.providers.JsonRpcProvider();

            fetchTokenDetails(
                erc20.map((token) => ({
                    address: token.address,
                    balance: token.balance,
                    networkId: token.networkId,
                    account: token.account,
                })),
                provider,
            ).then((allTokens) => {
                dispatch({
                    type: "SET_TOKEN_DETAILS",
                    data: [nativeToken, ...allTokens],
                });
            });
        }
    }, [JSON.stringify(erc20), chainId]); // erc20 by itself re-renders infinitely

    const handleRowClick = (row: FormattedToken) => {
        dispatch({ type: "SET_SELECTED_TOKEN", data: row });
        dispatch({ type: "SET_VIEW", data: "TRANSACTION_CREATE" });
    };
    const columns = getTokenTableColumns(logo, handleRowClick);
    if (!allAvailableTokens || allAvailableTokens.length === 0 || !safeAddress) {
        return <NoActivity section="Tokens" />;
    }
    return (
        <Box>
            <TanstackTable
                data={allAvailableTokens}
                columns={columns}
                itemsCentered={true}
                border="none"
                maxHeight="300px"
                onRowClick={handleRowClick}
            />
        </Box>
    );
};

// safeWallet and chainId must be defined
const CollectiblesPreview = ({ safeWallet, chainId }: { safeWallet: SafeWalletReadOnly; chainId: number }) => {
    const [, dispatch] = useContext(WalletContext);
    const templateColumns = useBreakpointValue({
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
    });
    const getMetadata = trpc.collection.collectionMetadata.collectionTokenMetadata.useMutation();

    const safeAddress = safeWallet.address;

    const [erc721, erc721Options] = erc721Hooks.useGetWhere({
        networkId: chainId.toString(),
        owner: safeAddress,
    });
    const [erc1155, erc1155Options] = erc1155BalanceHooks.useGetWhere({
        networkId: chainId.toString(),
        account: safeAddress,
    });

    const [mutationResults, setMutationResults] = useState<
        (TokenMetadata & {
            tokenId: string;
            address: string;
            type: "ERC721" | "ERC1155";
            safeAddress: string;
        })[]
    >([]);

    useEffect(() => {
        if (erc721Options.status === "success" && erc721 && erc1155Options.status === "success" && erc1155) {
            fetchClickableTokens(erc721, erc1155, chainId, safeWallet, getMetadata)
                .then(setMutationResults)
                .catch(console.error);
        }
    }, [erc721Options.status, erc1155Options.status, safeAddress, chainId]);

    const handleClick = (token: FormattedCollectibe) => {
        dispatch({ type: "SET_SELECTED_COLLECTIBLE", data: token });
        dispatch({ type: "SET_VIEW", data: "COLLECTIBLES" });
    };

    if (mutationResults.length === 0) {
        return <NoActivity section="Collectibles" />;
    }

    return (
        <Box maxHeight="400px" overflowY="auto">
            <Grid templateColumns={templateColumns} gap={3}>
                {mutationResults.map((token) => (
                    <Box key={`${token.address}-${token.tokenId}`}>
                        <Button onClick={() => handleClick(token)} variant="unstyled" height="100%">
                            <Card
                                p={5}
                                _hover={{
                                    bg: "baseHover",
                                    transform: "scale(1.02)",
                                }}
                                borderColor="card.border"
                                transition="0.2s"
                                bgColor="card.bg"
                            >
                                <Stack>
                                    <Text isTruncated maxWidth="150px" fontWeight="bold">
                                        {token.name}
                                    </Text>
                                    <Box boxSize="150px" position="relative">
                                        {token.image ? (
                                            <Image
                                                src={token.image}
                                                alt={token.name}
                                                borderRadius="lg"
                                                border="2px"
                                                borderColor="card.headerBg"
                                                objectFit="cover"
                                                boxSize="full"
                                            />
                                        ) : (
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                borderRadius="lg"
                                                border="2px"
                                                borderColor="card.headerBg"
                                                boxSize="full"
                                            >
                                                <CiImageOff size="xl" />
                                            </Box>
                                        )}
                                        {token.type === "ERC1155" && token.balance && (
                                            <Text
                                                position="absolute"
                                                bottom="2"
                                                right="2"
                                                px="2"
                                                bgColor={"transparentBg"}
                                                borderRadius="full"
                                            >
                                                {token.balance}
                                            </Text>
                                        )}
                                    </Box>
                                </Stack>
                            </Card>
                        </Button>
                    </Box>
                ))}
            </Grid>
        </Box>
    );
};

export interface FormattedToken {
    address: string;
    balance: string;
    networkId: string;
    account: string;
    formattedBalance?: string;
    decimals?: number;
    name?: string;
    symbol?: string;
    logo?: string;
    type?: "Native" | "ERC20";
}

export async function fetchTokenDetails(
    tokens: FormattedToken[],
    provider: JsonRpcProvider,
): Promise<FormattedToken[]> {
    const contractAbi = [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function decimals() view returns (uint8)",
    ];

    return await Promise.all(
        tokens.map(async (token) => {
            const contract = new ethers.Contract(token.address, contractAbi, provider);
            const name = await contract.name();
            const symbol = await contract.symbol();
            const decimals = await contract.decimals();
            const formattedBalance = ethers.utils.formatUnits(token.balance, decimals);
            return { ...token, name, symbol, formattedBalance, decimals };
        }),
    );
}

export interface FormattedCollectibe extends TokenMetadata {
    tokenId: string;
    address: string;
    type: "ERC721" | "ERC1155";
    safeAddress: string;
    balance?: string;
}
interface Collectibe {
    tokenId?: string;
    id?: string;
    address?: string;
    balance?: string;
}

async function fetchClickableTokens(
    erc721: Collectibe[],
    erc1155: Collectibe[],
    chainId: number,
    safeWallet: (Required<SafeWalletId> & SafeWalletReadOnly) | undefined,
    getMetadata: any,
): Promise<FormattedCollectibe[]> {
    const promises = [
        ...erc721.map((token) => createTokenPromise(token, "ERC721", chainId, safeWallet, getMetadata)),
        ...erc1155.map((token) => createTokenPromise(token, "ERC1155", chainId, safeWallet, getMetadata)),
    ];

    const results = await Promise.all(promises);
    const validResults = results.filter((result): result is FormattedCollectibe => result !== null);
    return validResults;
}

async function createTokenPromise(
    token: Collectibe,
    type: "ERC721" | "ERC1155",
    chainId: number,
    safeWallet: (Required<SafeWalletId> & SafeWalletReadOnly) | undefined,
    getMetadata: any,
): Promise<FormattedCollectibe | null> {
    const tokenId = token?.tokenId ?? token.id;
    const address = token?.address;
    const balance = type === "ERC1155" ? token?.balance : undefined;

    if (!tokenId || !address || !safeWallet?.address || (type === "ERC1155" && balance === "0")) {
        return Promise.resolve(null);
    }

    return getMetadata
        .mutateAsync({
            networkId: chainId.toString(),
            tokenId,
            address,
        })
        .then((metadata: any) => ({
            type,
            tokenId,
            address,
            balance,
            safeAddress: safeWallet?.address,
            ...metadata,
        }));
}
