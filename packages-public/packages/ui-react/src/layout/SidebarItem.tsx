import { Link, useRouter } from "@tanstack/react-router";
import { Flex, FlexProps, Image, Text, useColorMode } from "@chakra-ui/react";
import { useMemo } from "react";
import { ColorModes } from "../theme/index.js";

export interface SidebarItemProps extends FlexProps {
    iconSvgBasename: string;
    children: React.ReactNode;
    to: string;
    isExternal?: boolean;
    onClose: (() => void) | undefined;
}

interface SidebarItemColors {
    color: string;
    borderColor: string;
    bgColor: string;
    _hover?: any;
}

const SIDEBAR_ITEM_COLORS: Record<ColorModes, Record<string, SidebarItemColors>> = {
    light: {
        normal: {
            borderColor: "transparent",
            bgColor: "transparent",
            color: "gray.400",
            _hover: {
                bgColor: "primary.50",
            },
        },
        selected: {
            borderColor: "primary.100",
            bgColor: "primary.50",
            color: "primary.100",
        },
    },
    dark: {
        normal: {
            borderColor: "transparent",
            bgColor: "transparent",
            color: "gray.200",
            _hover: {
                bgColor: "primary.200",
            },
        },
        selected: {
            borderColor: "primary.100",
            bgColor: "primary.300",
            color: "white",
        },
    },
};

export const SidebarItem = ({ iconSvgBasename, children, to, isExternal, onClose, ...rest }: SidebarItemProps) => {
    const router = useRouter();
    const href: string | undefined = router.state.latestLocation?.href;

    // ensure we select sidemenu if we're in a subpage
    const selected = to === href || to.split("/")[1] === href.split("/")[1];

    const { colorMode } = useColorMode();

    const sideBarItemColors = useMemo(() => {
        const colors = SIDEBAR_ITEM_COLORS[colorMode];
        if (selected) {
            return colors.selected;
        }
        return colors.normal;
    }, [colorMode, to, href]);

    const iconSrc = `/menu/sidebar/_${colorMode}/${iconSvgBasename}${selected ? "-selected" : ""}.svg`;

    const SideBarItemFlexBox = (
        <>
            <Flex
                align="center"
                p="3"
                mx="4"
                mt="3"
                borderWidth="2px"
                borderRadius="lg"
                cursor="pointer"
                role="group"
                {...rest}
                {...sideBarItemColors}
            >
                <Image src={iconSrc} mr="4" width="24px" fontSize="13" />
                <Text as="b" fontWeight="600">
                    {children}
                </Text>
            </Flex>
        </>
    );

    return isExternal ? (
        <a href={to} target="_blank" onClick={onClose}>
            {SideBarItemFlexBox}
        </a>
    ) : (
        <Link to={to} search={{}} params={{}} onClick={onClose}>
            {SideBarItemFlexBox}
        </Link>
    );
};
