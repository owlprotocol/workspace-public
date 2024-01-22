import { Box, BoxProps, Link, Text } from "@chakra-ui/react";
import { forwardRef } from "react";
import { truncateAddress } from "../utils/truncateAddress.js";

interface AddressOrTransactionLinkProps {
    networkExplorerUrl: string;
    type: "tx" | "address" | "contracts";
    addressOrHash: string;
}

export const AddressOrTransactionLink = forwardRef<HTMLElement, AddressOrTransactionLinkProps & BoxProps>(
    ({ addressOrHash, networkExplorerUrl, type, ...boxProps }, ref) => (
        <Box ref={ref} {...boxProps} cursor="pointer">
            {networkExplorerUrl ? (
                <Link href={`${networkExplorerUrl}/${type}/${addressOrHash}`} isExternal>
                    <Text maxWidth="300px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                        {truncateAddress(addressOrHash)}
                    </Text>
                </Link>
            ) : (
                <Link href={`/${type}/${addressOrHash}`} isExternal>
                    <Text maxWidth="300px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                        {truncateAddress(addressOrHash)}
                    </Text>
                </Link>
            )}
        </Box>
    ),
);
