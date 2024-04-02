import {
    Image,
    Text,
    Button,
    Flex,
    HStack,
    Input,
    Divider,
    Box,
    Card,
    Stack,
    Tooltip,
    Grid,
    useToast,
    useBreakpointValue,
    Accordion,
    AccordionItem,
    AccordionIcon,
    AccordionButton,
    AccordionPanel,
    useColorModeValue,
} from "@chakra-ui/react";
import { CheckCircleIcon, ExternalLinkIcon, WarningIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useRef } from "react";
import { useForm, FieldApi } from "@tanstack/react-form";
import { trpc } from "@owlprotocol/contracts-api-client-trpc/react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { networksReadOnlyHooks } from "@owlprotocol/contracts-api-firebase/hooks";
import { CiImageOff } from "react-icons/ci";
import { WalletContext } from "./walletContextUtils.js";
import { truncateAddress } from "../../utils/index.js";
import { AddressOrTransactionLink } from "../AddressOrTransactionLink.js";

//First page after clicking on a collectibles
export const WalletCollectiblesView = () => {
    const [{ selectedCollectible }, dispatch] = useContext(WalletContext);
    const [chainId] = useLocalStorage<number>("chainId");

    useRedirectIfChainIdChanged(chainId, dispatch);

    const fontSize = useBreakpointValue({ base: "xs", md: "md" });
    const [network] = networksReadOnlyHooks.useGet(chainId.toString());

    const handleSend = () => {
        dispatch({ type: "SET_VIEW", data: "SEND_COLLECTIBLE" });
    };
    const handleGoBack = () => {
        dispatch({ type: "SET_VIEW", data: "HOME" });
    };
    const handleOpenSea = () => {
        // TODO: change when we add more chains (for now only appears for 80001 and 137)
        let url: string;
        if (chainId === 80001) {
            url = `https://testnets.opensea.io/assets/mumbai/${selectedCollectible!.address}/${
                selectedCollectible!.tokenId
            }`;
        } else {
            url = `https://opensea.io/assets/matic/${selectedCollectible!.address}/${selectedCollectible!.tokenId}`;
        }
        window.open(url, "_blank");
    };
    if (!selectedCollectible) {
        handleGoBack();
        return null;
    }
    return (
        <>
            <Flex direction="column" gap={4} w="full">
                <Flex justifyContent="center">
                    <CardCollectible />
                </Flex>

                <Grid templateColumns="30% 70%" gap={2}>
                    <Text fontWeight="bold" fontSize={fontSize}>
                        Token Id:
                    </Text>
                    <Text fontSize={fontSize}>{selectedCollectible.tokenId}</Text>
                    <Text fontWeight="bold" fontSize={fontSize}>
                        Name:
                    </Text>
                    <Text fontSize={fontSize}>{selectedCollectible.name}</Text>

                    <Text fontWeight="bold" fontSize={fontSize}>
                        Description:
                    </Text>
                    <Text fontSize={fontSize}>{selectedCollectible.description}</Text>

                    {selectedCollectible.type == "ERC1155" && (
                        <>
                            <Text fontWeight="bold" fontSize={fontSize}>
                                Balance:
                            </Text>
                            <Text fontSize={fontSize}>{selectedCollectible.balance}</Text>
                        </>
                    )}

                    <Text fontWeight="bold" fontSize={fontSize}>
                        Collection Address:
                    </Text>

                    <Text fontSize={fontSize}>
                        {network?.explorer ? (
                            <AddressOrTransactionLink
                                networkExplorerUrl={network.explorer}
                                type="address"
                                addressOrHash={selectedCollectible.address}
                            />
                        ) : (
                            truncateAddress(selectedCollectible.address)
                        )}
                    </Text>
                </Grid>
                {selectedCollectible.attributes && (
                    <Accordion allowToggle>
                        <AccordionItem border="none">
                            <AccordionButton>
                                <Box flex="1" textAlign="center" fontSize={fontSize}>
                                    Token Attributes <AccordionIcon />
                                </Box>
                            </AccordionButton>
                            <AccordionPanel>
                                <Grid templateColumns={"repeat(1, 1fr)"} gap={3} maxHeight="350px" overflowY="auto">
                                    {selectedCollectible.attributes.map((attribute, index) => (
                                        <Box
                                            key={index}
                                            bg="input.border"
                                            p={2}
                                            borderRadius="xl"
                                            textAlign="center"
                                            fontSize={fontSize}
                                        >
                                            <Text fontWeight="bold" mb={1}>
                                                {attribute.trait_type}
                                            </Text>
                                            <Text>{attribute.value}</Text>
                                        </Box>
                                    ))}
                                </Grid>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                )}

                <Button variant="primary" borderRadius="full" onClick={handleSend}>
                    Send
                </Button>
                <HStack justify="space-between">
                    <Button variant="secondary" borderRadius="full" width="full" onClick={handleGoBack}>
                        Back to Wallet
                    </Button>

                    {chainId === 80001 || chainId === 137 ? (
                        <Button variant="secondary" borderRadius="full" width="full" onClick={handleOpenSea}>
                            OpenSea <ExternalLinkIcon ml="4" />
                        </Button>
                    ) : null}
                </HStack>
            </Flex>
        </>
    );
};

function FieldInfo({ field }: { field: FieldApi<any, any> }) {
    return <Box h={5}>{field.state.meta.errors && <Text color="red">{field.state.meta.errors}</Text>}</Box>;
}

//Second page after clicking on send, prompts the user for the recipient's address
export const WalletSendCollectible = () => {
    const [{ selectedCollectible }, dispatch] = useContext(WalletContext);
    const [chainId] = useLocalStorage<number>("chainId");

    useRedirectIfChainIdChanged(chainId, dispatch);

    const handleConfirm = () => {
        if (!selectedCollectible) {
            return;
        }
        dispatch({ type: "SET_VIEW", data: "CONFIRM_SEND_COLLECTIBLE" });
    };

    const form = useForm({
        defaultValues: {
            walletAddress: "",
            amount: 0,
        },
        onSubmit: async (values) => {
            if (!values.walletAddress) {
                return;
            }
            dispatch({ type: "SET_FORM_VALUES", data: values });
            handleConfirm();
        },
    });

    return (
        <Flex direction="column" gap={6} w="full">
            <Flex justifyContent="center">
                <CardCollectible />
            </Flex>

            <form.Provider>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        void form.handleSubmit();
                    }}
                >
                    <Flex mb={2} gap={4} direction="column">
                        <form.Field
                            name="walletAddress"
                            onChange={(value) => {
                                if (!value) {
                                    return "Wallet address is required";
                                }
                                if (!/^0x[a-fA-F0-9]{40}$/.test(value)) {
                                    return "Address is invalid";
                                }
                            }}
                        >
                            {(field) => (
                                <>
                                    <Box>
                                        <label htmlFor="walletAddress">
                                            <strong>Send to:</strong>
                                        </label>
                                    </Box>
                                    <Input
                                        borderRadius={15}
                                        id="walletAddress"
                                        name="walletAddress"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="0x0000000000000000000000000000000000000000"
                                    />
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                        {selectedCollectible && selectedCollectible.type == "ERC1155" && (
                            <form.Field
                                name="amount"
                                onChange={(value) => {
                                    const numValue = Number(value);
                                    if (!value || numValue <= 0 || !Number.isInteger(numValue)) {
                                        return "Amount must be a positive whole number";
                                    }
                                    if (numValue > Number(selectedCollectible.balance)) {
                                        return "Amount cannot exceed your balance";
                                    }
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Box>
                                            <label htmlFor="amount">
                                                <strong>Amount:</strong>
                                            </label>
                                        </Box>
                                        <Input
                                            borderRadius={15}
                                            id="amount"
                                            name="amount"
                                            type="number"
                                            value={field.state.value === 0 ? "" : field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                                            placeholder="Enter amount"
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        )}
                    </Flex>
                    <Flex justifyContent="center">
                        <Button type="submit" variant="primary" borderRadius="full" w="100%" h={12}>
                            Preview Transfer
                        </Button>
                    </Flex>
                </form>
            </form.Provider>
        </Flex>
    );
};

// Third confirmation page after clicking on send, prompts the user to confirm the transfer
export const WalletSendCollectibleConfirm = () => {
    const [{ formValues, selectedCollectible }, dispatch] = useContext(WalletContext);
    const transferERC721 = trpc.interfaces.IERC721.safeTransferFrom.useMutation();
    const transferERC1155 = trpc.interfaces.IERC1155.safeTransferFrom.useMutation();
    const [chainId] = useLocalStorage<number>("chainId");
    useRedirectIfChainIdChanged(chainId, dispatch);
    const toast = useToast();

    if (!formValues || !formValues.walletAddress) {
        return null;
    }
    const [currentNetwork] = networksReadOnlyHooks.useGetWhereFirst({
        chainId,
    });

    const handleCancel = () => {
        dispatch({ type: "SET_VIEW", data: "HOME" });
    };
    const handleConfirm = () => {
        if (!selectedCollectible) {
            return;
        }
        dispatch({ type: "SET_TRANSFER_STATUS", data: { status: "idle" } });
        const transferToast = toast({
            title: "Transferring...",
            status: "info",
            isClosable: true,
            position: "top",
        });
        const onSuccess = (data: { txHash: string }) => {
            dispatch({
                type: "SET_TRANSFER_STATUS",
                data: { status: "success", txHash: data.txHash },
            });
            dispatch({ type: "SET_VIEW", data: "CONFIRMED" });
            toast.close(transferToast);
        };
        const onError = () => {
            dispatch({
                type: "SET_TRANSFER_STATUS",
                data: { status: "failure" },
            });
            dispatch({ type: "SET_VIEW", data: "CONFIRMED" });
            toast.close(transferToast);
        };

        if (selectedCollectible.type == "ERC721") {
            transferERC721.mutate(
                {
                    networkId: chainId.toString(),
                    address: selectedCollectible.address,
                    contractParams: {
                        to: formValues.walletAddress,
                        tokenId: selectedCollectible.tokenId,
                        from: selectedCollectible.safeAddress,
                    },
                },
                {
                    onError,
                    onSuccess,
                },
            );
        } else if (selectedCollectible.type == "ERC1155") {
            transferERC1155.mutate(
                {
                    networkId: chainId.toString(),
                    address: selectedCollectible.address,
                    contractParams: {
                        to: formValues.walletAddress,
                        id: selectedCollectible.tokenId,
                        from: selectedCollectible.safeAddress,
                        amount: formValues.amount.toString(),
                        data: "0x",
                    },
                },
                {
                    onError,
                    onSuccess,
                },
            );
        }
    };

    if (!currentNetwork) {
        return null;
    }

    return (
        <Flex direction="column" gap={4} w="100%" alignItems="center">
            <CardCollectible erc1155Amount={formValues.amount} />
            <Flex justifyContent="space-between" w="100%">
                <Stack spacing={4} fontWeight="bold">
                    <Text>Send To</Text>
                    <Text>Network</Text>
                </Stack>
                <Stack spacing={4} textAlign="right">
                    <Tooltip label={formValues.walletAddress} placement="top" bg="gray" borderRadius={10}>
                        {/* // TODO: add tooltip to truncateAddress */}
                        <Text>{truncateAddress(formValues.walletAddress)}</Text>
                    </Tooltip>
                    <Text>
                        {currentNetwork.name} ({chainId})
                    </Text>
                </Stack>
            </Flex>
            <Divider />
            <Flex justifyContent="center" gap={4} width="full">
                <Button variant="secondary" borderRadius="full" width="full" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="primary" borderRadius="full" width="full" onClick={handleConfirm}>
                    Confirm Transfer
                </Button>
            </Flex>
        </Flex>
    );
};

export const WalletSendCollectibleConfirmed = () => {
    const [{ formValues, transferStatus }, dispatch] = useContext(WalletContext);
    const [chainId] = useLocalStorage<number>("chainId");
    useRedirectIfChainIdChanged(chainId, dispatch);
    const [network] = networksReadOnlyHooks.useGet(chainId.toString());
    const networkExplorerUrl = network?.explorer ?? "";
    if (!formValues) {
        return null;
    }

    const handleBackToWallet = () => {
        dispatch({ type: "SET_VIEW", data: "HOME" });
    };
    return (
        <Flex direction="column" gap={5} w="100%" alignItems="center">
            <CardCollectible width="60%" erc1155Amount={formValues.amount} />
            {transferStatus?.status === "success" ? (
                <HStack
                    as="button"
                    spacing={4}
                    textColor="purplelight"
                    onClick={() =>
                        window.open(
                            `${networkExplorerUrl}/tx/${transferStatus?.txHash}`,
                            "_blank",
                            "noopener,noreferrer",
                        )
                    }
                >
                    <CheckCircleIcon />
                    <Text fontWeight="semibold" fontSize="md">
                        Transfer Completed
                    </Text>
                    <ExternalLinkIcon />
                </HStack>
            ) : (
                <HStack spacing={4} textColor="red.500">
                    <WarningIcon />
                    <Text fontWeight="semibold" fontSize="md">
                        Transfer Failed
                    </Text>
                </HStack>
            )}
            <Divider />
            <Button variant="primary" borderRadius="full" width="100%" h={12} onClick={handleBackToWallet}>
                Back to Wallet
            </Button>
        </Flex>
    );
};

export const CardCollectible = ({ width = "60%", erc1155Amount }: { width?: string; erc1155Amount?: number }) => {
    const borderColor = useColorModeValue("card.border.default", "card.border._dark");
    const [{ selectedCollectible }] = useContext(WalletContext);
    if (!selectedCollectible) {
        return null;
    }
    const { image, name, type, balance } = selectedCollectible || {};

    return (
        <Card
            borderColor={borderColor}
            borderWidth={2}
            bgColor={"card.collectibleBg"}
            borderRadius="lg"
            p={4}
            w={width}
        >
            <Text fontWeight="semibold" fontSize="lg" textAlign="center">
                {name}
            </Text>
            <Box position="relative" w="full">
                {image ? (
                    <Box borderRadius="lg" borderWidth={2} borderColor={borderColor}>
                        <Image src={image} alt={name || "Image description"} borderRadius="lg" objectFit="cover" />
                    </Box>
                ) : (
                    <Box borderRadius="lg">
                        <CiImageOff size="xl" />
                    </Box>
                )}
                {type == "ERC1155" && (
                    <Flex
                        position="absolute"
                        bgColor={"transparentBg"}
                        justifyContent="center"
                        alignItems="center"
                        borderRadius="full"
                        bottom="2"
                        right="2"
                        px={3}
                    >
                        <Text as="b">{erc1155Amount || balance}</Text>
                    </Flex>
                )}
            </Box>
        </Card>
    );
};

export function useRedirectIfChainIdChanged(chainId: number, dispatch: React.Dispatch<any>) {
    const initialChainId = useRef(chainId);

    useEffect(() => {
        if (chainId !== initialChainId.current) {
            dispatch({ type: "SET_VIEW", data: "HOME" });
            initialChainId.current = chainId;
        }
    }, [chainId]);
}
