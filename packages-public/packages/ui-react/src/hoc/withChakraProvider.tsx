import { ChakraBaseProvider } from "@chakra-ui/react";
import { getComponentDisplayName } from "./getComponentDisplayName.js";
import { theme } from "../theme/index.js";

/**
 * Wrapp component with Chakra provider
 * @param WrappedComponent
 * @returns
 */
export const withChakraProvider = (WrappedComponent: any) => {
    const component = (props: any) => {
        return (
            <ChakraBaseProvider theme={theme}>
                <WrappedComponent {...props} />
            </ChakraBaseProvider>
        );
    };
    component.displayName = `withChakraProvider(${getComponentDisplayName(WrappedComponent)})`;
    return component;
};
