import { Button, HStack } from "@chakra-ui/react";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { useRouter } from "@tanstack/react-router";
// import { theme } from "../theme/index.js";
import { ColorModeToggle } from "./ColorModeToggle.js";

export const HeaderSignedOut = () => {
    const router = useRouter();
    const currentUrl: string = router.state.latestLocation?.href || "";
    return (
        <>
            <HStack spacing={0}>
                <ColorModeToggle />
                <SignInButton mode="modal" redirectUrl={currentUrl}>
                    <Button variant="secondary">Sign in</Button>
                </SignInButton>
                <SignUpButton mode="modal" redirectUrl={currentUrl}>
                    <Button variant="primary" ml="4">
                        Sign up
                    </Button>
                </SignUpButton>
            </HStack>
        </>
    );
};
