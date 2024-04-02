import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "@tanstack/react-router";

interface BreadcrumbItemProps {
    label: string;
    to: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItemProps[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    return (
        <Box mb={10}>
            <Breadcrumb spacing={{ base: "1", sm: "2" }} separator={<ChevronRightIcon color="gray" />}>
                {items.map((item, index) => {
                    const isCurrent = index === items.length - 1;
                    return (
                        <BreadcrumbItem key={index} isCurrentPage={isCurrent}>
                            {isCurrent ? (
                                <Text fontSize={{ base: "xs", sm: "sm" }} fontWeight="light">
                                    {item.label}
                                </Text>
                            ) : (
                                <BreadcrumbLink
                                    as={Link}
                                    to={item.to}
                                    fontSize={{ base: "xs", sm: "sm" }}
                                    fontWeight="normal"
                                >
                                    {item.label}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    );
                })}
            </Breadcrumb>
        </Box>
    );
};
