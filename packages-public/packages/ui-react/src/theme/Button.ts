import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
    // weird bug here, these need to be defined together in pairs in the same order
    baseStyle: {
        color: "button.base.text",
        textColor: "button.base.text",

        bg: "button.base.bg",
        backgroundColor: "button.base.bg",

        borderColor: "button.base.bg",

        minW: "120px",
        minWidth: "120px",

        borderRadius: "8px",
        borderWidth: "2px",

        textDecoration: "none",

        _hover: {
            bg: "button.base.bgHover",
            backgroundColor: "button.base.bgHover",
            bgColor: "button.base.bgHover",
            borderColor: "button.base.borderHover",
        },
    },
    variants: {
        primary: {
            bgColor: "button.primary.bg",
            borderColor: "button.primary.border",
            color: "button.primary.text",
            textColor: "button.primary.text",
            _hover: {
                bgColor: "primary.75",
                _disabled: {
                    bgColor: "primary.75",
                },
            },
            textDecoration: "none",
        },
        secondary: {
            bgColor: "button.secondary.bg",
            borderColor: "button.secondary.border",
            color: "button.secondary.text",
            textColor: "button.secondary.text",
            _hover: {
                bgColor: "button.secondary.bgHover",
            },
            textDecoration: "none",
        },
        highlight: {
            borderColor: "cmp.buttonOutlineBorder",
            _hover: {
                bgColor: "mainBg",
            },
        },
        customButton: {
            borderRadius: "8px",
            border: "2px solid",
            borderColor: "purpledeep",
            colorScheme: "purple",
            variant: "outline",
            px: "7",
            backgroundColor: "purpledeep",
            color: "whitebright",
            _hover: {
                border: "2px solid",
                borderRadius: "10px",
                bgColor: "graydark",
                borderColor: "purpledeep",
            },
            _disabled: {
                opacity: 0.5,
                cursor: "not-allowed",
            },
        },
        walletAction: {
            h: "60px",
            borderRadius: "full",
            bgColor: "wallet.action.bg",
            border: "transparent",
            _hover: {
                bgColor: "wallet.action.bgHover",
            },
        },
    },
});
