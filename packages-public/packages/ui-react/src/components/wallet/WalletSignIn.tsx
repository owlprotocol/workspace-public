import { Flex, Heading, Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { SignIn } from "@clerk/clerk-react";

export const WalletSignIn = () => {
    const handleWalletSignInClose = () => {
        //TODO: refactor this logic once we have Wallet standalone repo
        window.history.back();
    };

    return (
        <Modal onClose={handleWalletSignInClose} size="lg" isOpen={true} isCentered>
            <ModalOverlay bg="blackAlpha" backdropFilter="blur(10px)" />
            <ModalContent
                alignItems="center"
                p={4}
                //TODO: move the bg color to Wallet's theme once we have a standalone repo
                bg="linear-gradient(to bottom, rgba(255,255,255,0) 210px, white 210px), linear-gradient(to right, rgba(28, 28, 36, 0.9), rgba(45, 45, 54, 0.9), rgba(28, 28, 36, 0.9)), linear-gradient(to right, #4761E7, #B372CE, #FF7586)"
            >
                <ModalBody color="white">
                    <Flex direction="column" justifyContent="center" alignItems="center">
                        <Heading py="60px">Sign in to Owl Connect</Heading>
                        {/* TODO: refactor redirect logic once we have a standalone repo */}
                        <SignIn redirectUrl="/wallet" />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
