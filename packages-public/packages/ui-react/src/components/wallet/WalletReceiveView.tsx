import { CopyIcon } from "@chakra-ui/icons";
import { Button, Card, CardBody, Flex, Spinner, Text, useClipboard, useToast } from "@chakra-ui/react";
import { useUser } from "@clerk/clerk-react";
import { safeWalletsReadOnlyHooks } from "@owlprotocol/contracts-api-firebase/hooks";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useContext } from "react";
import QRCode from "react-qr-code";
import { WalletContext } from "./walletContextUtils.js";

export const WalletReceiveView = () => {
    const toast = useToast();
    const { user } = useUser();
    const userId = user?.id;
    const [chainId] = useLocalStorage<number>("chainId");
    const [, dispatch] = useContext(WalletContext);

    const [safeWallet] = safeWalletsReadOnlyHooks.useGetWhereFirst(
        chainId && userId
            ? {
                  owner: userId,
                  networkId: chainId?.toString(),
              }
            : {},
    );
    const { onCopy } = useClipboard(safeWallet?.address ?? "");
    const handleGoHome = () => {
        dispatch({
            type: "SET_VIEW",
            data: "HOME",
        });
    };
    if (!safeWallet?.address) {
        return <Spinner />;
    }

    const handleWalletAddressCopy = () => {
        onCopy();
        toast({
            title: "API Key Copied to Clipboard",
            description: "",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
        });
    };
    return (
        <Flex direction="column" gap={10}>
            <Card>
                <CardBody bgColor="white">
                    <QRCode
                        size={300}
                        style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "100%",
                        }}
                        value={safeWallet.address}
                        viewBox={`0 0 300 300`}
                    />
                </CardBody>
            </Card>
            <Flex width="100%" justify="space-between">
                <Button flex="1" variant="secondary" borderRadius="full" onClick={handleGoHome} mr={2}>
                    Back
                </Button>
                <Button flex="1" variant="primary" borderRadius="full" onClick={handleWalletAddressCopy}>
                    <CopyIcon />
                    <Text>Copy Address</Text>
                </Button>
            </Flex>
        </Flex>
    );
};
