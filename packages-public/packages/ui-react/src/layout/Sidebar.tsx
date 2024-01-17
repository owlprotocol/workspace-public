// Credit: https://github.com/hauptrolle/chakra-templates
import {
    Container,
    Box,
    BoxProps,
    CloseButton,
    Divider,
    Drawer,
    DrawerContent,
    Flex,
    Image,
    Stack,
    Text,
} from "@chakra-ui/react";
import { SidebarItem } from "./SidebarItem.js";

export interface SidebarContentProps extends BoxProps {
    onClose: () => void;
}

export interface SidebarLinkItemProps {
    name: string;
    iconSvgBasename: string;
    to: string;
    isExternal?: boolean;
}

interface SidebarProps {
    linkItems: Array<SidebarLinkItemProps>;
    learnLinkItems: Array<SidebarLinkItemProps>;
    developersLinkItems: Array<SidebarLinkItemProps> | null;
    children: any;
    isSidebarOpen: boolean;
    onSidebarClose: () => void;
}

const SidebarContent = ({
    linkItems,
    learnLinkItems,
    developersLinkItems,
    onClose,
    ...rest
}: {
    linkItems: Array<SidebarLinkItemProps>;
    learnLinkItems: Array<SidebarLinkItemProps>;
    developersLinkItems: Array<SidebarLinkItemProps> | null;
} & Partial<SidebarContentProps>) => {
    return (
        <Box
            w={{ base: "100%", md: "60" }}
            pos="fixed"
            h="full"
            pt={10}
            color="layout.sidebarText"
            bgColor="layout.sidebarBg"
            overflowY="auto"
            {...rest}
        >
            <Box display={{ base: "block", md: "none" }} px={6} pt={4}>
                <Flex justifyContent="space-between">
                    <Image src="/logo_cropped.png" alt="logo" w="32px" h="32px" />
                    <CloseButton onClick={onClose} />
                </Flex>
            </Box>
            {linkItems.map((link, idx) => (
                <Stack key={idx} gap={4}>
                    <SidebarItem iconSvgBasename={link.iconSvgBasename} to={link.to} onClose={onClose}>
                        {link.name}
                    </SidebarItem>
                </Stack>
            ))}

            {developersLinkItems && (
                <Box>
                    <Box mx={7} py={2} pt={6}>
                        <Box pb={2}>
                            <Text as="b">Developers</Text>
                        </Box>
                        <Divider />
                    </Box>
                    <Box>
                        {developersLinkItems.map((link, idx) => (
                            <SidebarItem
                                key={idx}
                                iconSvgBasename={link.iconSvgBasename}
                                to={link.to}
                                onClose={onClose}
                            >
                                {link.name}
                            </SidebarItem>
                        ))}
                    </Box>
                </Box>
            )}

            <Box mx={7} py={2} pt={8}>
                <Box pb={2}>
                    <Text as="b">Learn</Text>
                </Box>
                <Divider />
            </Box>
            {learnLinkItems.map((link, idx) => (
                <SidebarItem
                    key={idx}
                    iconSvgBasename={link.iconSvgBasename}
                    to={link.to}
                    onClose={onClose}
                    isExternal={link.isExternal}
                >
                    {link.name}
                </SidebarItem>
            ))}
        </Box>
    );
};

export const Sidebar = ({
    linkItems,
    learnLinkItems,
    developersLinkItems,
    children,
    isSidebarOpen,
    onSidebarClose,
}: SidebarProps) => {
    return (
        <Box pt="75px" color="layout.sidebarText" bgColor="layout.sidebarBg">
            <SidebarContent
                learnLinkItems={learnLinkItems}
                developersLinkItems={developersLinkItems}
                linkItems={linkItems}
                onClose={onSidebarClose}
                display={{ base: "none", md: "block" }}
            />
            <Drawer isOpen={isSidebarOpen} placement="left" onClose={onSidebarClose} returnFocusOnClose={false}>
                <DrawerContent>
                    <SidebarContent
                        linkItems={linkItems}
                        learnLinkItems={learnLinkItems}
                        developersLinkItems={developersLinkItems}
                        onClose={onSidebarClose}
                    />
                </DrawerContent>
            </Drawer>
            <Box ml={{ base: 0, md: 60 }} bgColor="baseBg" color="baseText">
                <Container id="main" py={12} px={14} ml={0} maxW="container.xl">
                    {children}
                </Container>
            </Box>
        </Box>
    );
};
