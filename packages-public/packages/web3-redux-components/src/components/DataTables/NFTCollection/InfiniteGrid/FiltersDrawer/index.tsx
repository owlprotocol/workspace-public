import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input,
    useDisclosure,
} from "@chakra-ui/react";

import { Box, useTheme } from "@chakra-ui/react";
import { useRef } from "react";

const FiltersDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    const { themes } = useTheme();

    return (
        <Box>
            <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
                Filters
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Filters</DrawerHeader>

                    <DrawerBody>x</DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export { FiltersDrawer };
