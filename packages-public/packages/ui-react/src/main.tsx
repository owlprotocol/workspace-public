import React from "react";
//@ts-expect-error
import ReactDOM from "react-dom/client";
import { ColorModeScript } from "@chakra-ui/react";
import { theme } from "./theme/index.js";
import App from "./App.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
    </React.StrictMode>,
);
