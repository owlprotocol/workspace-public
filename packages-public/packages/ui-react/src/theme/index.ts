import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import "@fontsource-variable/inter";
import { Button } from "./Button.js";
import { Tabs } from "./Tabs.js";
import { textStyles } from "./textStyles.js";
import { layerStyles } from "./layerStyles.js";

export type ColorModes = "light" | "dark";

const config: ThemeConfig = {
    initialColorMode: "system",
    useSystemColorMode: false,
};

// cyan: {
//     50: "#EDFDFD",
//         100: "#C4F1F9",
//         200: "#9DECF9",
//         300: "#76E4F7",
//         400: "#0BC5EA",
//         500: "#00B5D8",
//         600: "#00A3C4",
//         700: "#0987A0",
//         800: "#086F83",
//         900: "#065666",
// },
// background: "#131419",
//     charcoal: "#1C1C24",
//     purplelight: "#4447E3",
//     purplelight2: "#5356FF",
//     purple: "#2B2D7D",
//     purpledark: "#1D1E41",
//     purpledeep: "#3E1E82",
//     purpleblue: "#191A3A",
//     whiteoff: "#DBE4E6",
//     black: "#1C1C24",
//     bluegreen: "#41C4A5",
//     grad1: "linear-gradient(51.77deg, #9C01F5 21.85%, #1DA1F4 83.42%)",
//     gradpurple: "linear-gradient(99.23deg, #942457 1.6%, #8318DD 97.94%)",
//     gray: "#AEAEBD",
//     gray1: "#70797B",
//     gray2: "#92929D",
//     gray3: "#454545",
//     graydark: "#2C2C30",
//     orangelight: "#E4A951",
//     red2: "#EE015F",
//     redWhite: "#f0729f",
//     storyBG: "#131419",
//     whitebright: "#FFFFFF",
//     greenbright: "#29CC6A",
//     green20Opacity: "rgba(41, 204, 106, 0.2)",
//     boxShadow: "3px 0px 0px 0px rgba(53, 53, 56, 0.6)",
//     boxGradient:
// "linear-gradient(45deg, rgba(28, 28, 36, 0.9) 0%, rgba(45, 45, 54, 0.9) 50%, rgba(28, 28, 36, 0.9) 100%)",

export const theme = extendTheme({
    config,
    fonts: {
        body: `'Inter Variable', 'Helvetica', 'sans-serif'`,
    },
    fontWeights: {
        hairline: 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 600,
        extrabold: 700,
        black: 800,
    },
    colors: {
        bgLight: "#FFFFFF",
        bgDark: "#1C1C24",
        bgFade: "rgba(255, 255, 255, 0.2)",
        gray: {
            10: "#F8F8FA",
            25: "#E7E7E9",
            50: "#CDCFD0",
            55: "#EBEBEB",
            60: "#92929D",
            100: "#B7C6C9",
            200: "#B8C5C9",
            300: "#70797B",
            400: "#6B657D",
            500: "#4D4761",
            600: "#404044",
            700: "#2C2C30",
            800: "#282339",
            900: "#131419",
        },
        primary: {
            50: "#D8D6F4",
            75: "#5356FF",
            100: "#4447E2",
            200: "#2B2D7D",
            300: "#312A7A",
            400: "#1D1E5F",
        },
        warning: {
            100: "#FCE1B3",
            200: "#F59E0B",
        },
        error: {
            100: "#FAC5C5",
            200: "#EF4444",
        },
        success: {
            100: "#B5E9D8",
            200: "#10B981",
            400: "#1A8545",
        },

        // old colors
        background: "#131419",
        purplelight: "#4447E3",
        purplelight2: "#5356FF",
        purple: "#2B2D7D",
        purpledark: "#1D1E41",
        purpledeep: "#3E1E82",
        purpleblue: "#191A3A",
        whiteoff: "#DBE4E6",
        black: "#1C1C24",
        bluegreen: "#41C4A5",
        grad1: "linear-gradient(51.77deg, #9C01F5 21.85%, #1DA1F4 83.42%)",
        gradpurple: "linear-gradient(99.23deg, #942457 1.6%, #8318DD 97.94%)",
        gray1: "#70797B",
        gray2: "#92929D",
        gray3: "#454545",
        graydark: "#2C2C30",
        orangelight: "#E4A951",
        red2: "#EE015F",
        redWhite: "#f0729f",
        storyBG: "#131419",
        whitebright: "#FFFFFF",
        greenbright: "#29CC6A",
        green20Opacity: "rgba(41, 204, 106, 0.2)",
        boxShadow: "3px 0px 0px 0px rgba(53, 53, 56, 0.6)",
        boxGradient:
            "linear-gradient(45deg, rgba(28, 28, 36, 0.9) 0%, rgba(45, 45, 54, 0.9) 50%, rgba(28, 28, 36, 0.9) 100%)",
    },
    semanticTokens: {
        colors: {
            baseBg: {
                default: "gray.10",
                _dark: "gray.900",
            },
            baseText: {
                default: "gray.800",
                _dark: "bgLight",
            },
            primaryText: {
                default: "gray.50",
            },
            invertBg: {
                default: "bgDark",
                _dark: "bgLight",
            },
            invertText: {
                default: "bgLight",
                _dark: "gray.800",
            },
            hoverText: {
                default: "primary.100",
                _dark: "primary.50",
            },
            text: {
                wallet: {
                    default: "gray.60",
                    _dark: "white",
                },
            },
            errorText: {
                default: "error.200",
                _dark: "error.100",
            },
            baseHover: {
                default: "gray.25",
                _dark: "gray.700",
            },
            // lighter grey for subtitles
            baseSubText: {
                default: "gray.600",
                _dark: "gray.50",
            },
            transparentBg: {
                default: "rgba(231, 231, 233, 0.8)", // rgba equivalent of gray.25 with 80% transparency
                _dark: "rgba(19, 20, 25, 0.8)", // rgba equivalent of gray.900 with 80% transparency
            },
            card: {
                bg: {
                    default: "bgLight",
                    _dark: "bgDark",
                },
                collectibleBg: {
                    default: "bgLight",
                    _dark: "gray.700",
                },
                border: {
                    default: "gray.25",
                    _dark: "gray.800",
                },
                headerBg: {
                    default: "gray.25",
                    _dark: "gray.700",
                },
            },
            input: {
                border: {
                    default: "gray.50",
                    _dark: "gray.600",
                },
            },
            bannerBg: {
                default: "primary.100",
                _dark: "primary.200",
            },
            button: {
                base: {
                    bg: {
                        default: "gray.25",
                        _dark: "gray.600",
                    },
                    text: {
                        default: "gray.800",
                        _dark: "bgLight",
                    },
                    border: {
                        default: "gray.50",
                        _dark: "gray.600",
                    },
                    bgHover: {
                        default: "gray.10",
                        _dark: "gray.700",
                    },
                    borderHover: {
                        default: "gray.50",
                        _dark: "gray.600",
                    },
                },
                primary: {
                    bg: {
                        default: "primary.100",
                    },
                    text: {
                        default: "white",
                    },
                    border: {
                        default: "primary.100",
                    },
                },
                secondary: {
                    bg: {
                        default: "bgLight",
                        _dark: "bgDark",
                    },
                    bgHover: {
                        default: "gray.50",
                        _dark: "gray.700",
                    },
                    text: {
                        default: "primary.100",
                        _dark: "white",
                    },
                    border: {
                        default: "gray.100",
                        _dark: "white",
                    },
                },
            },
            layout: {
                headerBg: {
                    default: "bgLight",
                    _dark: "bgDark",
                },
                headerBorder: {
                    default: "gray.25",
                    _dark: "gray.700",
                },
                sidebarBg: {
                    default: "bgLight",
                    _dark: "bgDark",
                },
                sidebarText: {
                    default: "gray.400",
                    _dark: "gray.200",
                },
            },
            cmp: {
                buttonOutlineBorder: {
                    default: "gray.100",
                    _dark: "gray.400",
                },
            },
            wallet: {
                action: {
                    bg: {
                        default: "gray.10",
                        _dark: "gray.900",
                    },
                    bgHover: {
                        default: "gray.50",
                        _dark: "gray.700",
                    },
                    text: {
                        default: "primary.100",
                    },
                },
            },
        },
    },
    styles: {
        global: {
            ".body": {
                overflowY: "scroll",
                transition: "all 0.3s linear",
            },
            body: {
                backgroundColor: "baseBg",
                minHeight: "100vh",
                MozOsxFontSmoothing: "grayscale",
                textRendering: "optimizeLegibility",
                WebkitFontSmoothing: "antialiased",
                fontWeight: "400",
            },
            "li a, p a": {
                fontWeight: "600",
            },
            html: {
                scrollBehavior: "smooth",
            },
            ul: {
                pl: "4",
                li: {
                    fontWeight: 600,
                },
            },
            h2: {
                fontWeight: 600,
            },
        },
    },
    textStyles,
    layerStyles,
    components: {
        Tabs,
        Button,
        Link: {
            baseStyle: {
                textDecoration: "underline",
                _hover: {
                    textDecoration: "underline",
                },
            },
        },
        List: {
            variants: {
                dropdownItem: {
                    item: {
                        padding: 2,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        _hover: {
                            color: "white",
                            bgColor: "bannerBg",
                        },
                        _selected: {
                            color: "baseText",
                            fontWeight: 600,
                            bgColor: "baseBg",
                            cursor: "not-allowed",
                        },
                    },
                },
            },
        },
        // TODO: move this into a multiPartStyle for WalletHomeView
        Tab: {
            baseStyle: {
                color: "gray.60",
                fontSize: "sm",
                borderRadius: "full",
                cursor: "pointer",
                _selected: {
                    borderColor: "button.primary.border",
                    bgColor: "button.primary.bg",
                    color: "button.primary.text",
                    borderRadius: "full",
                },
                _hover: {
                    bg: "button.secondary.bgHover",
                    _selected: {
                        bgColor: "button.primary.bg",
                    },
                },
            },
        },
        Tooltip: {
            baseStyle: {
                padding: "2",
                bg: "baseBg",
                color: "baseText",
                borderRadius: "md",
            },
        },
    },
});
