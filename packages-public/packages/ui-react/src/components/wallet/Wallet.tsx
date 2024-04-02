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
export interface WalletProps {
    isStandalone?: boolean;
    closeOnOverlayClick?: boolean;
}

//Use generic children prop to pass child components into 'WalletLayout'
const WalletLayout = ({ children, isStandalone, closeOnOverlayClick }: { children: ReactNode } & WalletProps) => {
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
                closeOnOverlayClick={closeOnOverlayClick}
            >
                <ModalOverlay bg="blackAlpha.900" />
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
                            {!isStandalone ? (
                                <ModalCloseButton
                                    color="baseText"
                                    border="solid 1px"
                                    borderRadius="full"
                                    top="none"
                                    position="relative"
                                    right="0"
                                    ref={initialRef}
                                />
                            ) : (
                                <div />
                            )}
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

export const Wallet = ({ isStandalone = false, closeOnOverlayClick = false }: WalletProps) => {
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

    return (
        <WalletLayout isStandalone={isStandalone} closeOnOverlayClick={closeOnOverlayClick}>
            {(() => {
                switch (state.view) {
                    case "SIGN_IN":
                        return <WalletSignIn />;
                    case "TRANSACTION_CREATE":
                        return <WalletCreateTransactionView />;
                    case "TRANSACTION_CONFIRM":
                        return <WalletConfirmTransactionView />;
                    case "TRANSACTION_RESULT":
                        return <WalletTransactionResultView />;
                    case "RECEIVE":
                        return <WalletReceiveView />;
                    case "COLLECTIBLES":
                        return <WalletCollectiblesView />;
                    case "SEND_COLLECTIBLE":
                        return <WalletSendCollectible />;
                    case "CONFIRM_SEND_COLLECTIBLE":
                        return <WalletSendCollectibleConfirm />;
                    case "CONFIRMED":
                        return <WalletSendCollectibleConfirmed />;
                    default:
                        return <WalletHomeView />;
                }
            })()}
        </WalletLayout>
    );
};
