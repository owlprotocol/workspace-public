import { RouterProvider } from "@tanstack/react-router";
import {
    withChakraProvider,
    withClerkProvider,
    withFirebaseAppProvider,
    withFirebaseSigninCheck,
    withTRPCProvider,
} from "./hoc/index.js";
import { router } from "./router.js";

//TODO: Add provider react-query, firebase, clerk
// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
    return <RouterProvider router={router} />;
};

// eslint-disable-next-line import/no-default-export, react-refresh/only-export-components
export default withChakraProvider(
    withClerkProvider(withFirebaseAppProvider(withFirebaseSigninCheck(withTRPCProvider(App)))),
);

//export default withChakraProvider(App);
