import { Flex, HStack, IconButton, Image, useDisclosure, useColorMode } from "@chakra-ui/react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { FiMenu } from "react-icons/fi";
import { useEffect, useState } from "react";
import { HeaderSignedIn } from "./HeaderSignedIn.js";
import { HeaderSignedOut } from "./HeaderSignedOut.js";
import { SidebarLinkItemProps, Sidebar } from "./Sidebar.js";

const MOBILE_SCREEN_SIZE_BREAKPOINT = 768;

{
    /**
     Note: Main Content is wrapped inside Sidebar
     */
}
export const Layout = ({ children }: { children: any }) => {
    const { onOpen: onSidebarOpen, isOpen: isSidebarOpen, onClose: onSidebarClose } = useDisclosure();
    const { isSignedIn } = useUser();
    const { colorMode } = useColorMode();
    const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_SCREEN_SIZE_BREAKPOINT);

    //On resize, set `isMobile` based on window width
    //See solution https://stackoverflow.com/questions/39435395/reactjs-how-to-determine-if-the-application-is-being-viewed-on-mobile-or-deskto
    const handleResize = () => {
        if (window.innerWidth < MOBILE_SCREEN_SIZE_BREAKPOINT) {
            setIsMobile(true);
            return;
        }
        setIsMobile(false);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <Flex
                px={{ base: 4, md: 9 }}
                pt="5px"
                height="75px" // height here should be the same as Sidebar's pt
                position="fixed"
                alignItems="center"
                width="100%"
                justifyContent="space-between"
                zIndex="100"
                textColor="baseText"
                bgColor="layout.headerBg"
                borderColor="layout.headerBorder"
                borderBottomWidth="1px"
            >
                <HStack alignItems="center" gap={3}>
                    <IconButton
                        display={{ base: "flex", md: "none" }}
                        onClick={onSidebarOpen}
                        variant="highlight"
                        aria-label="open menu"
                        icon={<FiMenu />}
                        minW="50px"
                    />
                    {/* //@ts-expect-error TODO: Link incoherent */}
                    <Link to={"/home" as any}>
                        <Image
                            src={
                                isMobile
                                    ? "/logo_cropped.png"
                                    : colorMode === "light"
                                    ? "/logo_full-black.png"
                                    : "/logo_full.png"
                            }
                            alt="logo"
                            maxWidth="150px"
                            maxH="50px"
                        />
                    </Link>
                </HStack>
                {isSignedIn ? <HeaderSignedIn /> : <HeaderSignedOut />}
            </Flex>
            <Sidebar
                linkItems={isSignedIn ? linkItemsSignedIn : linkItemsSignedOut}
                developersLinkItems={isSignedIn ? developersLinkItems : null}
                learnLinkItems={learnLinkItems}
                children={children}
                isSidebarOpen={isSidebarOpen}
                onSidebarClose={onSidebarClose}
            />
        </>
    );
};

const commonLinkItems: Array<SidebarLinkItemProps> = [
    {
        name: "Home",
        iconSvgBasename: "dashboard",
        to: "/home",
    },
];

const linkItemsSignedOut: Array<SidebarLinkItemProps> = [
    ...commonLinkItems,
    {
        name: "Networks",
        iconSvgBasename: "networks",
        to: "/networks",
    },
];

const linkItemsSignedIn: Array<SidebarLinkItemProps> = [
    ...commonLinkItems,
    {
        name: "Projects",
        iconSvgBasename: "projects",
        to: "/projects/list",
    },
    {
        name: "Wallet",
        iconSvgBasename: "profile",
        to: "/wallet",
    },
];

//TODO: bring this back and pass as prop to Sidebar when we have user related tabs to display
// const userLinkItems: Array<LinkItemProps> = [
//     { name: "My Coupons", icon: FiTag, to: "/coupons" },
// ];

const developersLinkItems: Array<SidebarLinkItemProps> = [
    {
        name: "API Keys",
        iconSvgBasename: "apiKeys",
        to: "/api-keys",
    },
    {
        name: "Contracts",
        iconSvgBasename: "contracts",
        to: "/contracts/list",
    },
    {
        name: "Networks",
        iconSvgBasename: "networks",
        to: "/networks",
    },
    {
        name: "Transactions",
        iconSvgBasename: "transaction",
        to: "/transactions",
    },
];

const learnLinkItems: Array<SidebarLinkItemProps> = [
    {
        name: "Docs",
        iconSvgBasename: "docs",
        to: "https://docs-api.owlprotocol.xyz/docs",
        isExternal: true,
    },
    {
        name: "Blog",
        iconSvgBasename: "guides",
        to: "https://medium.com/owlprotocol",
        isExternal: true,
    },
];
