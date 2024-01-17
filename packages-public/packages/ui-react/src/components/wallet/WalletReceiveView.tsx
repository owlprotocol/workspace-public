import { CopyIcon } from "@chakra-ui/icons";
import { Button, Card, CardBody, Flex, Spinner, Text, useClipboard, useToast } from "@chakra-ui/react";
import { useUser } from "@clerk/clerk-react";
import { safeWalletsReadOnlyHooks } from "@owlprotocol/contracts-api-firebase/hooks";
import { useLocalStorage } from "@uidotdev/usehooks";
import QRCode from "react-qr-code";

export const WalletReceiveView = () => {
    const toast = useToast();
    const { user } = useUser();
    const userId = user?.id;
    const [chainId] = useLocalStorage<number>("chainId");

    const [safeWallet] = safeWalletsReadOnlyHooks.useGetWhereFirst(
        chainId && userId
            ? {
                  owner: userId,
                  networkId: chainId?.toString(),
              }
            : {},
    );
    const { onCopy } = useClipboard(safeWallet?.address ?? "");
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
            <Button variant="primary" size="lg" borderRadius={50} gap={3} onClick={handleWalletAddressCopy}>
                <CopyIcon />
                <Text>Copy Address</Text>
            </Button>
        </Flex>
    );
};
