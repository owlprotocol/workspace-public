import { Box, Circle, Flex, Link, VStack, Text } from "@chakra-ui/react";
import moment from "moment";

type TimelineProps = {
    blogs: Blog[] | undefined;
};

type Blog = {
    title: string;
    url: string;
    timestamp: number;
};

const TimelineNode = ({ blog, isLast }: { blog: Blog; isLast: boolean }) => {
    const { title, timestamp, url } = blog;
    const date = moment(Number(timestamp));
    return (
        <Flex position="relative" justifyContent="flex-start" pt={3}>
            <Box pt={1}>
                <Circle size="16px" bg="gray" zIndex="1" />
            </Box>
            <Box ml="4">
                <Link
                    fontSize="md"
                    href={url}
                    isExternal
                    maxWidth="200px"
                    _hover={{
                        color: "hoverText",
                        textDecoration: "underline",
                    }}
                >
                    <Text noOfLines={2} maxW="200px">
                        {title}
                    </Text>
                </Link>
                <Text fontSize="sm">{date.fromNow()}</Text>
            </Box>
            {!isLast && (
                <Box
                    mt={1}
                    ml="-0.5px"
                    width="1px"
                    bg="gray"
                    height="100%"
                    position="absolute"
                    top="15px"
                    left="7.5px"
                />
            )}
        </Flex>
    );
};

export const Timeline = ({ blogs }: TimelineProps) => {
    return (
        <VStack layerStyle="card" px={8} py={4} minW="250px" minHeight="40px" alignItems="left">
            <Text as="b" width="100%" fontSize={20}>
                Latest Changes
            </Text>
            {blogs?.length ? (
                <Box pl={4} pt={5}>
                    {blogs
                        .slice(0, 3)
                        .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
                        .map((blog, index) => (
                            <TimelineNode key={index} blog={blog} isLast={index === blogs.length - 1} />
                        ))}
                </Box>
            ) : (
                <></>
            )}
        </VStack>
    );
};
