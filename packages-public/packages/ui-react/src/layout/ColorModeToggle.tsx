import { Button, Box, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

export const ColorModeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <Button
                variant="highlight"
                borderWidth="2px"
                borderRadius="30px"
                background="baseBg"
                cursor="pointer"
                justifyContent="space-between"
                overflow="hidden"
                padding={2}
                mr={4}
                height={9}
                minWidth={9}
                width={9}
                onClick={toggleColorMode}
            >
                <Box display={colorMode === "light" ? "block" : "none"} color="bgDark">
                    <FaSun />
                </Box>
                <Box display={colorMode === "dark" ? "block" : "none"} color="white">
                    <FaMoon />
                </Box>
            </Button>
        </>
    );
};
