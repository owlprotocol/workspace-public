import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

// This function creates a set of function that helps us create multipart component styles.
const helpers = createMultiStyleConfigHelpers(["root", "tablist", "tab"]);

export const Tabs = helpers.defineMultiStyleConfig({
    variants: {
        base: {
            tablist: {
                border: "1px solid none",
                borderRadius: "md",
                bgColor: "card.bg",
                p: 1,
            },
            tab: {
                color: "gray.60",
                _selected: {
                    borderColor: "button.primary.border",
                    bgColor: "button.primary.bg",
                    color: "button.primary.text",
                },
                _hover: {
                    bg: "button.secondary.bgHover",
                    _selected: {
                        bgColor: "button.primary.bg",
                    },
                },
                pb: 2,
            },
        },
        rounded: {
            root: {
                align: "center",
                w: "100%",
                pt: 8,
            },
            tablist: {
                border: "1px solid none",
                borderRadius: "full",
                bgColor: "baseBg",
                p: 1,
            },
            tab: {
                color: "gray.60",
                fontSize: "sm",
                borderRadius: "full",
                cursor: "pointer",
                fontWeight: "bold",
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
            tabpanels: {
                backgroundColor: "baseBg",
                mt: 6,
                p: 4,
                w: "100%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
            },
        },
    },
    defaultProps: {
        variant: "base",
    },
});
