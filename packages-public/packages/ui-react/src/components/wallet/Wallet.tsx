import {
    Avatar,
    Center,
    Flex,
    // IconButton,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    ModalCloseButton,
    Spinner,
    useDisclosure,
} from "@chakra-ui/react";
import { useUser } from "@clerk/clerk-react";
// import { Link, useNavigate } from "@tanstack/react-router";
import { ReactNode, useContext, useEffect, useRef } from "react";
// import { FaHome } from "react-icons/fa";
import { WalletConfirmTransactionView } from "./WalletConfirmTransactionView.js";
import { WalletCreateTransactionView } from "./WalletCreateTransactionView.js";
import { WalletHomeView } from "./WalletHomeView.js";
import { WalletReceiveView } from "./WalletReceiveView.js";
import { WalletSignIn } from "./WalletSignIn.js";
import { WalletTransactionResultView } from "./WalletTransactionResultView.js";
import { WalletContext } from "./walletContextUtils.js";
import { NetworkDropdown, SettingsProfile } from "../../layout/index.js";
import {
    WalletCollectiblesView,
    WalletSendCollectible,
    WalletSendCollectibleConfirm,
    WalletSendCollectibleConfirmed,
} from "./index.js";

// TODO: Import ERC20,721 and 1155 hooks

//Use generic children prop to pass child components into 'WalletLayout'
const WalletLayout = ({ children }: { children: ReactNode }) => {
    const {
        isOpen: isAccountSettingsOpen,
        onOpen: onAccountSettingsOpen,
        onClose: onAccountSettingsClose,
    } = useDisclosure();
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    // const navigate = useNavigate();
    const { user } = useUser();
    const initialRef = useRef(null);

    //TODO: logic needs to be refactored to work in any context
    /*
    const onWalletClose = () => {
        // navigate({ to: "/home" });
        console.error('onWalletClose NOT IMPLEMENTED');
    };
     */
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="lg"
                initialFocusRef={initialRef}
                isCentered
                closeOnOverlayClick={false}
            >
                <ModalOverlay bg="blackAlpha.800" />
                <ModalContent bg="card.bg" color="baseText" minHeight="400px" p={4}>
                    <ModalBody>
                        <Flex justifyContent="space-between" alignItems="center" pb={2}>
                            {/*
                            <Link to={"/home"} style={{ outline: "none" }}>
                                <Flex
                                    borderRadius="full"
                                    overflow="hidden"
                                    width="10"
                                    height="10"
                                    align="center"
                                    justify="center"
                                    border="2px solid"
                                    borderColor="gray.200"
                                >
                                    <IconButton
                                        aria-label="Navigate to home"
                                        variant="secondary"
                                        fontSize="20px"
                                        icon={<FaHome />}
                                    />
                                </Flex>
                            </Link>
                            */}
                            <ModalCloseButton
                                color="baseText"
                                border="solid 1px"
                                borderRadius="full"
                                top="none"
                                position="relative"
                                right="0"
                                ref={initialRef}
                            />
                            <NetworkDropdown margin={0} />
                            <Avatar
                                boxSize={8}
                                cursor="pointer"
                                src={`${user?.imageUrl}`}
                                onClick={() => {
                                    onAccountSettingsOpen();
                                }}
                            />
                        </Flex>

                        <Flex mt={8} justifyContent="center" alignItems="center" direction="column">
                            {children}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <SettingsProfile isOpen={isAccountSettingsOpen} onClose={onAccountSettingsClose} />
        </>
    );
};

export const Wallet = () => {
    const [state, dispatch] = useContext(WalletContext);
    const { isSignedIn, isLoaded } = useUser();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            dispatch({ type: "SET_VIEW", data: "SIGN_IN" });
        }
    }, [isLoaded, isSignedIn]);

    if (!isLoaded) {
        return (
            <Center height="100vh">
                <Spinner size="xl" />
            </Center>
        );
    }

    //TODO: if more views added, consider using IIFE inside the JSX to reuse `WalletLayout`
    //https://react-cn.github.io/react/tips/if-else-in-JSX.html
    switch (state.view) {
        case "SIGN_IN":
            return <WalletSignIn />;
        case "TRANSACTION_CREATE":
            return (
                <WalletLayout>
                    <WalletCreateTransactionView />
                </WalletLayout>
            );

        case "TRANSACTION_CONFIRM":
            return (
                <WalletLayout>
                    <WalletConfirmTransactionView />
                </WalletLayout>
            );
        case "TRANSACTION_RESULT":
            return (
                <WalletLayout>
                    <WalletTransactionResultView />
                </WalletLayout>
            );
        case "RECEIVE":
            return (
                <WalletLayout>
                    <WalletReceiveView />
                </WalletLayout>
            );
        case "COLLECTIBLES":
            return (
                <WalletLayout>
                    <WalletCollectiblesView />
                </WalletLayout>
            );
        case "SEND_COLLECTIBLE":
            return (
                <WalletLayout>
                    <WalletSendCollectible />
                </WalletLayout>
            );
        case "CONFIRM_SEND_COLLECTIBLE":
            return (
                <WalletLayout>
                    <WalletSendCollectibleConfirm />
                </WalletLayout>
            );
        case "CONFIRMED":
            return (
                <WalletLayout>
                    <WalletSendCollectibleConfirmed />
                </WalletLayout>
            );
        default:
            return (
                <WalletLayout>
                    <WalletHomeView />
                </WalletLayout>
            );
    }
};
