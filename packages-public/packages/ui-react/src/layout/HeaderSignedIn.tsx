import {
    Avatar,
    Box,
    Flex,
    HStack,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Modal,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { UserProfile, useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useContext } from "react";
import { FiChevronDown } from "react-icons/fi";
import { NetworkDropdown } from "./NetworkDropdown.js";
import { ColorModeToggle } from "./ColorModeToggle.js";
import { FirebaseSigninContext } from "../hoc/withFirebaseSigninCheck.js";

export const HeaderSignedIn = () => {
    const { isOpen, onOpen: onModalOpen, onClose } = useDisclosure();

    return (
        <>
            <Flex justifyContent="space-between" width="100%" gap={3}>
                <NetworkDropdown margin={16} />
                <HStack>
                    <ColorModeToggle />
                    <UserMenu onModalOpen={onModalOpen} />
                    <SettingsProfile isOpen={isOpen} onClose={onClose} />
                </HStack>
            </Flex>
        </>
    );
};

type SettingsProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const SettingsProfile = ({ isOpen, onClose }: SettingsProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <Flex alignItems="center" justifyContent="center">
                    <UserProfile />
                </Flex>
            </ModalContent>
        </Modal>
    );
};

export const UserMenu = ({ onModalOpen }: { onModalOpen: () => void }) => {
    const { signOut } = useClerk();
    const { user } = useUser();
    const navigate = useNavigate();
    const { revokeTokens } = useContext(FirebaseSigninContext);

    const handleSignOut = useCallback(() => {
        signOut();
        revokeTokens();
        //TODO: Link incoherent
        navigate({ to: "/home" as any });
    }, []);

    return (
        <Menu>
            <MenuButton py={2} _focus={{ boxShadow: "none" }}>
                <HStack>
                    <Avatar boxSize={10} src={`${user?.imageUrl}`} />
                    <VStack
                        display={{
                            base: "none",
                            md: "flex",
                        }}
                        alignItems="flex-start"
                        spacing="1px"
                        ml="2"
                    >
                        <Text fontSize="sm" as="b">
                            {user?.fullName}
                        </Text>
                        <Text fontSize="xs" as="b">
                            Admin
                        </Text>
                    </VStack>
                    <Box
                        display={{
                            base: "none",
                            md: "flex",
                        }}
                    >
                        <FiChevronDown />
                    </Box>
                </HStack>
            </MenuButton>
            <MenuList bg="card.bg" color="baseText" borderColor={useColorModeValue("gray.200", "gray.700")}>
                <MenuItem
                    bg="card.bg"
                    onClick={onModalOpen}
                    _hover={{
                        bgColor: "baseBg",
                    }}
                >
                    My Profile
                </MenuItem>
                <MenuDivider />
                <MenuItem
                    bg="card.bg"
                    onClick={handleSignOut}
                    _hover={{
                        bgColor: "baseBg",
                    }}
                >
                    Sign Out
                </MenuItem>
            </MenuList>
        </Menu>
    );
};
