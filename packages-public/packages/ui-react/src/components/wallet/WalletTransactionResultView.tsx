import { CheckCircleIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Image, Text, Tooltip } from "@chakra-ui/react";
import { useUser } from "@clerk/clerk-react";
import { networksReadOnlyHooks, safeWalletsReadOnlyHooks } from "@owlprotocol/contracts-api-firebase/hooks";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useContext } from "react";
import { WalletContext } from "./walletContextUtils.js";
import { useRedirectIfChainIdChanged } from "./WalletCollectiblesView.js";
import { truncateAddress } from "../../utils/index.js";

export const WalletTransactionResultView = () => {
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
    const [network] = networksReadOnlyHooks.useGet(chainId.toString());
    const networkExplorerUrl = network?.explorer ?? "";

    if (!sendTransaction || !chainId || !selectedToken || !safeWallet) {
        return null;
    }
    return (
        <Flex direction="column" alignItems="center" gap={9} w="100%">
            <Heading size="xl">{`${sendTransaction.sendAmount} ${selectedToken.symbol}`}</Heading>
            <Flex gap={3} alignItems="center">
                <Tooltip label={safeWallet.address} placement="top">
                    <Text color="text.wallet">{truncateAddress(safeWallet.address)}</Text>
                </Tooltip>
                <Image src="../../rightArrow.svg" alt="rightArrow" />

                <Tooltip label={sendTransaction.sendTo} placement="top">
                    <Text color="text.wallet">{truncateAddress(sendTransaction.sendTo)}</Text>
                </Tooltip>
            </Flex>
            {sendTransaction?.error ? (
                <Text color="error.200">{`Transaction failed: ${sendTransaction.error}`}</Text>
            ) : (
                <Flex justifyContent="center" alignItems="center" gap={4} textColor="purplelight">
                    <CheckCircleIcon />
                    <Text fontWeight="semibold">Transfer Completed</Text>
                    <Box
                        cursor="pointer"
                        onClick={() =>
                            window.open(
                                `${networkExplorerUrl}/tx/${sendTransaction.txHash}`,
                                "_blank",
                                "noopener,noreferrer",
                            )
                        }
                    >
                        <ExternalLinkIcon mb="4px" />
                    </Box>
                </Flex>
            )}
            <Flex justifyContent="space-between" w="100%" gap={4}>
                <Button
                    borderRadius="full"
                    variant="primary"
                    w="100%"
                    onClick={() => {
                        dispatch({
                            type: "SET_VIEW",
                            data: "HOME",
                        });
                    }}
                >
                    Close
                </Button>
            </Flex>
        </Flex>
    );
};
