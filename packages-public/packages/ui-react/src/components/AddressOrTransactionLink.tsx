import { Box, BoxProps, Link, Text } from "@chakra-ui/react";
import { forwardRef } from "react";
import { truncateAddress } from "../utils/truncateAddress.js";

interface AddressOrTransactionLinkProps {
    networkExplorerUrl: string;
    type: "tx" | "address";
    addressOrHash: string;
}

export const AddressOrTransactionLink = forwardRef<HTMLElement, AddressOrTransactionLinkProps & BoxProps>(
    ({ addressOrHash, networkExplorerUrl, type, ...boxProps }, ref) => (
        <Box ref={ref} {...boxProps}>
            {networkExplorerUrl ? (
                <Link href={`${networkExplorerUrl}/${type}/${addressOrHash}`} isExternal>
                    <Text maxWidth="300px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                        {truncateAddress(addressOrHash)}
                    </Text>
                </Link>
            ) : (
                <Text maxWidth="300px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                    {truncateAddress(addressOrHash)}
                </Text>
            )}
        </Box>
    ),
);
