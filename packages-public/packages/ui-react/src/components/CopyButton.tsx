import { Box } from "@chakra-ui/react";
import { FiCopy } from "react-icons/fi";

export const CopyButton = ({ onCopy }: { onCopy: () => void }) => (
    <Box
        as={FiCopy}
        onClick={onCopy}
        aria-label="Copy to clipboard"
        borderRadius="5px"
        _active={{
            transform: "scale(0.7)",
        }}
        _hover={{
            cursor: "pointer",
            color: "primaryText",
            bgColor: "primaryBg",
        }}
    />
);
