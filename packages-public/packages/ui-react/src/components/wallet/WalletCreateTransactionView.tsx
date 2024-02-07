import {
    Box,
    Button,
    Divider,
    Flex,
    FormLabel,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    NumberInput,
    NumberInputField,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import { networksReadOnlyHooks } from "@owlprotocol/contracts-api-firebase/hooks";
import { FormApi, useForm } from "@tanstack/react-form";
import { useLocalStorage } from "@uidotdev/usehooks";
import { utils } from "ethers";
import { useContext, useEffect } from "react";
import { trpc } from "@owlprotocol/contracts-api-client-trpc/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { WalletContext } from "./walletContextUtils.js";
import { useRedirectIfChainIdChanged } from "./WalletCollectiblesView.js";
import { AddressOrTransactionLink, FirebaseSigninContext, truncateAddress } from "../../index.js";
import { ipfsToHttp } from "../../utils/index.js";

export const WalletCreateTransactionView = () => {
    const [{ selectedToken, allAvailableTokens }, dispatch] = useContext(WalletContext);
    const [chainId] = useLocalStorage<number>("chainId");
    useRedirectIfChainIdChanged(chainId, dispatch);

    const [network] = networksReadOnlyHooks.useGet(chainId.toString());
    const { trpcToken } = useContext(FirebaseSigninContext);
    const { data: nativeTokenBalance } = trpc.safe.safeInfo.safeBalance.useQuery(
        {
            networkId: chainId.toString(),
        },
        { enabled: !!chainId && !!trpcToken },
    );
    const nativeTokenBalanceFormatted = utils.formatEther(nativeTokenBalance?.balance || "0").slice(0, 6);
    const currencySymbol = network?.nativeCurrency?.symbol ?? "ETH";

    const handleGoHome = () => {
        dispatch({
            type: "SET_SELECTED_TOKEN",
            data: undefined, // reset selected token
        });
        dispatch({
            type: "SET_VIEW",
            data: "HOME",
        });
    };
    const sendTransactionForm: FormApi<{ sendTo: string; sendAmount: string }> = useForm({
        defaultValues: {
            sendTo: "",
            sendAmount: "",
        },
        onSubmit: (values) => {
            const { sendTo, sendAmount } = values;
            const amount = sendAmount;

            dispatch({
                type: "SET_SEND_TRANSACTION",
                data: {
                    sendTo: sendTo,
                    sendAmount: amount.toString(),
                },
            });
            dispatch({
                type: "SET_VIEW",
                data: "TRANSACTION_CONFIRM",
            });
        },
    });
    useEffect(() => {
        // if no token is selected, select native token by default
        if (!selectedToken) {
            const nativeToken = allAvailableTokens?.find((token) => token.type === "Native");
            if (nativeToken) {
                dispatch({
                    type: "SET_SELECTED_TOKEN",
                    data: nativeToken,
                });
            }
        }
    }, []);
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Stack gap={5} width="100%">
            <Flex gap={5} alignItems="center" direction="column">
                <Popover isOpen={isOpen} onClose={onClose}>
                    <PopoverTrigger>
                        <Button variant="secondary" rightIcon={<ChevronDownIcon />} onClick={onOpen}>
                            {selectedToken ? (
                                <Flex justifyContent="center">
                                    <Image
                                        src={selectedToken.logo ? ipfsToHttp(selectedToken.logo) : "../../owlCoin.svg"}
                                        fallbackSrc="../../owlCoin.svg"
                                        alt="coin"
                                        boxSize="30px"
                                        mr={3}
                                    />
                                    <Flex direction="column" justifyContent="center">
                                        <Text as="b">{selectedToken.name}</Text>
                                    </Flex>
                                </Flex>
                            ) : (
                                "Select a token"
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <VStack>
                            {allAvailableTokens &&
                                (() => {
                                    const otherTokens = allAvailableTokens.filter(
                                        (token) => token.address !== selectedToken?.address,
                                    );

                                    if (otherTokens.length === 0) {
                                        return <Text p={2}>No other tokens available</Text>;
                                    }

                                    return otherTokens.map((token, index) => (
                                        <Box
                                            key={index}
                                            w="full"
                                            cursor="pointer"
                                            onClick={() => {
                                                dispatch({
                                                    type: "SET_SELECTED_TOKEN",
                                                    data: token,
                                                });
                                                onClose();
                                            }}
                                            _hover={{ bg: "gray.200" }}
                                        >
                                            <Flex alignItems="center" p={2}>
                                                <Image
                                                    src={token.logo ? ipfsToHttp(token.logo) : "../../owlCoin.svg"}
                                                    fallbackSrc="../../owlCoin.svg"
                                                    alt="coin"
                                                    boxSize="30px"
                                                    mr={3}
                                                />

                                                <Text as="b">{token.name}</Text>
                                            </Flex>
                                        </Box>
                                    ));
                                })()}
                        </VStack>
                    </PopoverContent>
                </Popover>
                <Flex justifyContent="space-between" w="full">
                    <Text as="b">Available Balance:</Text>
                    <Text>
                        {selectedToken
                            ? `${selectedToken.formattedBalance} ${selectedToken.symbol}`
                            : ` ${nativeTokenBalanceFormatted} ${currencySymbol}`}
                    </Text>
                </Flex>
                <Flex justifyContent="space-between" w="full">
                    <Text as="b">
                        {selectedToken?.type !== "Native" ? "Contract Address:" : "\u00A0"}
                        {/* // non-breaking space to prevent jump*/}
                    </Text>
                    <Text>
                        {selectedToken && selectedToken.type !== "Native" ? (
                            network?.explorer ? (
                                <AddressOrTransactionLink
                                    networkExplorerUrl={network?.explorer || ""}
                                    type="address"
                                    addressOrHash={selectedToken!.address}
                                />
                            ) : (
                                truncateAddress(selectedToken?.address || "")
                            )
                        ) : (
                            ""
                        )}
                    </Text>
                </Flex>
            </Flex>
            <sendTransactionForm.Provider>
                <VStack alignItems="flex-start">
                    <sendTransactionForm.Field
                        name="sendTo"
                        onChange={(address) => (!utils.isAddress(address) ? "Enter a valid address" : undefined)}
                    >
                        {(field) => (
                            <>
                                <FormLabel>
                                    <Text as="b">Send to</Text>
                                </FormLabel>
                                <Input
                                    border="1px solid"
                                    borderColor="gray.200"
                                    borderRadius={10}
                                    value={field.state.value}
                                    // TODO: add ENS name once we support it
                                    placeholder="Public address"
                                    _placeholder={{
                                        color: "gray.200",
                                    }}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                <Box h={5}>
                                    {field.state.meta.errors && (
                                        <Text color="error.200">{field.state.meta.errors}</Text>
                                    )}
                                </Box>
                            </>
                        )}
                    </sendTransactionForm.Field>
                </VStack>
                <VStack alignItems="flex-start" py={4}>
                    <sendTransactionForm.Field
                        name="sendAmount"
                        onChange={(amount) =>
                            parseFloat(amount) <= 0
                                ? "Amount must be greater than 0"
                                : parseFloat(amount) >
                                  parseFloat(selectedToken ? selectedToken.balance : nativeTokenBalanceFormatted)
                                ? "Insufficient funds"
                                : undefined
                        }
                    >
                        {(field) => (
                            <>
                                <FormLabel>
                                    <Text as="b">Amount</Text>
                                </FormLabel>
                                <InputGroup as={Flex} direction="column" gap={2}>
                                    <NumberInput
                                        min={0}
                                        w="100%"
                                        value={field.state.value}
                                        onChange={(valueAsString) => field.handleChange(valueAsString)}
                                    >
                                        <NumberInputField
                                            pr="120px"
                                            borderRadius={10}
                                            placeholder="0.0"
                                            borderColor="gray.200"
                                            _placeholder={{
                                                color: "gray.200",
                                            }}
                                        />
                                        <InputRightElement
                                            as={Flex}
                                            width="120px"
                                            gap={3}
                                            alignItems="center"
                                            overflow="hidden"
                                            borderColor="gray.200"
                                        >
                                            <Text>{selectedToken ? selectedToken.symbol : currencySymbol}</Text>{" "}
                                            <Divider orientation="vertical" />
                                            <Text
                                                as="b"
                                                color="primary.75"
                                                cursor="pointer"
                                                onClick={() =>
                                                    field.handleChange(
                                                        selectedToken
                                                            ? selectedToken.balance
                                                            : nativeTokenBalanceFormatted,
                                                    )
                                                }
                                            >
                                                max
                                            </Text>
                                        </InputRightElement>
                                    </NumberInput>
                                    <Box h={5}>
                                        {field.state.meta.errors && (
                                            <Text color="error.200">{field.state.meta.errors}</Text>
                                        )}
                                    </Box>
                                </InputGroup>
                            </>
                        )}
                    </sendTransactionForm.Field>
                </VStack>
                <Divider />
                <sendTransactionForm.Subscribe
                    selector={(state) => {
                        const isValidSendValues =
                            utils.isAddress(state.values.sendTo) &&
                            parseFloat(state.values.sendAmount) > 0 &&
                            parseFloat(state.values.sendAmount) <=
                                parseFloat(selectedToken ? selectedToken.balance : nativeTokenBalanceFormatted);
                        return {
                            canSubmit: isValidSendValues,
                        } as any;
                    }}
                    children={({ canSubmit }) => (
                        <Flex width="100%" justify="space-between">
                            <Button flex="1" variant="secondary" borderRadius="full" onClick={handleGoHome} mr={2}>
                                Back
                            </Button>
                            <Button
                                flex="1"
                                isDisabled={!canSubmit}
                                borderRadius="full"
                                variant="primary"
                                onClick={sendTransactionForm.handleSubmit}
                            >
                                Next
                            </Button>
                        </Flex>
                    )}
                />
            </sendTransactionForm.Provider>
        </Stack>
    );
};
