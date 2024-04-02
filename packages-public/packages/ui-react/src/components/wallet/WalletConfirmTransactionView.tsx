import { Button, Flex, Heading, Image, Text, Tooltip } from "@chakra-ui/react";
import { useUser } from "@clerk/clerk-react";
import { trpc } from "@owlprotocol/contracts-api-client-trpc/react";
import { safeWalletsReadOnlyHooks } from "@owlprotocol/contracts-api-firebase/hooks";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useContext } from "react";
import { parseUnits } from "ethers/lib/utils.js";
import { WalletContext } from "./walletContextUtils.js";
import { useRedirectIfChainIdChanged } from "./WalletCollectiblesView.js";
import { truncateAddress } from "../../utils/truncateAddress.js";

export const WalletConfirmTransactionView = () => {
    const { user } = useUser();
    const userId = user?.id;
    const [{ sendTransaction, selectedToken }, dispatch] = useContext(WalletContext);
    const [chainId] = useLocalStorage<number>("chainId");
    useRedirectIfChainIdChanged(chainId, dispatch);

    const [safeWallet] = safeWalletsReadOnlyHooks.useGetWhereFirst(
        chainId && userId
            ? {
                  networkId: chainId.toString(),
                  owner: userId,
              }
            : {},
    );

    const currencySymbol = selectedToken?.symbol ?? "";
    const sendTransactionMutation = trpc.safe.signTransaction.useMutation();
    const sendERC20TransactionMutation = trpc.interfaces.IERC20.transfer.useMutation();

    const handleSend = () => {
        if (!sendTransaction || !chainId || !selectedToken) {
            return;
        }
        const { sendAmount, sendTo, txData } = sendTransaction;
        if (!sendAmount || !sendTo) {
            return;
        }
        const sendNative = {
            networkId: chainId.toString(),
            to: sendTo,
            data: txData || "0x",
            value: parseUnits(sendAmount, selectedToken.decimals || 18).toString(),
        };
        const sendERC20 = {
            networkId: chainId.toString(),
            address: selectedToken.address,
            contractParams: {
                to: sendTo,
                amount: parseUnits(sendAmount, selectedToken.decimals || 18).toString(),
            },
        };

        if (selectedToken?.type === "Native") {
            sendTransactionMutation.mutate(sendNative, {
                onSuccess: (data) => {
                    dispatch({
                        type: "SET_SEND_TRANSACTION_TXHASH",
                        data: data.txHash,
                    });
                    dispatch({ type: "SET_VIEW", data: "TRANSACTION_RESULT" });
                },
                onError: (error) => {
                    dispatch({
                        type: "SET_SEND_TRANSACTION_ERROR",
                        data: error.message,
                    });
                    dispatch({ type: "SET_VIEW", data: "TRANSACTION_RESULT" });
                },
            });
        } else {
            sendERC20TransactionMutation.mutate(sendERC20, {
                onSuccess: (data) => {
                    dispatch({
                        type: "SET_SEND_TRANSACTION_TXHASH",
                        data: data.txHash,
                    });
                    dispatch({ type: "SET_VIEW", data: "TRANSACTION_RESULT" });
                },
                onError: (error) => {
                    dispatch({
                        type: "SET_SEND_TRANSACTION_ERROR",
                        data: error.message,
                    });
                    dispatch({ type: "SET_VIEW", data: "TRANSACTION_RESULT" });
                },
            });
        }
    };
    if (!safeWallet || !sendTransaction?.sendAmount || !sendTransaction?.sendTo) {
        return null;
    }

    return (
        <Flex direction="column" alignItems="center" gap={6} w="100%">
            <Image src="../../owlCoin.svg" alt="coin" />
            <Text fontSize="xl">Confirm your transaction</Text>
            <Heading size="xl">{`${sendTransaction.sendAmount} ${currencySymbol}`}</Heading>
            <Flex gap={3} alignItems="center">
                <Tooltip label={safeWallet.address} placement="top">
                    <Text color="text.wallet">{truncateAddress(safeWallet.address)}</Text>
                </Tooltip>
                <Image src="../../rightArrow.svg" alt="rightArrow" />

                <Tooltip label={sendTransaction.sendTo} placement="top">
                    <Text color="text.wallet">{truncateAddress(sendTransaction.sendTo)}</Text>
                </Tooltip>
            </Flex>
            {sendTransaction?.txData && (
                <Flex direction="column" width="100%" gap={2}>
                    <Text color="text.wallet">DATA:</Text>
                    <Flex bgColor="cardBg" border="1px solid" borderColor="cardBorder" p={6} borderRadius={20}>
                        <Text color="text.wallet">{sendTransaction.txData}</Text>
                    </Flex>
                </Flex>
            )}
            <Flex justifyContent="space-between" w="100%" gap={4}>
                <Button
                    borderRadius="full"
                    variant="secondary"
                    w="100%"
                    onClick={() => {
                        dispatch({ type: "SET_VIEW", data: "HOME" });
                    }}
                >
                    Cancel
                </Button>
                <Button
                    isLoading={sendERC20TransactionMutation.isLoading || sendTransactionMutation.isLoading}
                    borderRadius="full"
                    variant="primary"
                    w="100%"
                    onClick={handleSend}
                >
                    Confirm
                </Button>
            </Flex>
        </Flex>
    );
};
