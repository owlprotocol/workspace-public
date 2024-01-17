import {
    Box,
    Button,
    Flex,
    Heading,
    List,
    ListItem,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useUser } from "@clerk/clerk-react";
import { networksReadOnlyHooks, safeWalletsReadOnlyHooks } from "@owlprotocol/contracts-api-firebase/hooks";
import { NetworkReadOnly } from "@owlprotocol/contracts-api-firebase/models";
import { CHAIN_ID_FALLBACK } from "@owlprotocol/envvars/browser";
import { Link, useRouter } from "@tanstack/react-router";
import { useLocalStorage } from "@uidotdev/usehooks";
import { find } from "lodash-es";
import { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { theme } from "../theme/index.js";

type NetworkReadOnlyDeployed = NetworkReadOnly & { safeDeployed: boolean };

export const NetworkDropdown = ({ margin }: { margin?: number }) => {
    const { user: clerkUser } = useUser();
    const userId = clerkUser?.id;

    // TODO: figure out why passing arbitrary id returns wrong data
    const [safeWallets] = safeWalletsReadOnlyHooks.useGetWhere(
        userId
            ? {
                  owner: userId,
              }
            : // TODO: replace with an emptyObject when firebase crud is fixed
              { owner: "fixme" },
    );
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [chainId, saveChainId] = useLocalStorage("chainId");
    const [allNetworks] = networksReadOnlyHooks.useGetWhere({ enabled: true }, { orderBy: "rank", limit: 10 });
    const [curNetwork, setCurNetwork] = useState<NetworkReadOnlyDeployed>();
    const [networks, setNetworks] = useState<NetworkReadOnlyDeployed[]>([]);
    const router = useRouter();
    const href: string = router.state.latestLocation?.href || "";

    //Compute the redirect link on the network switch
    //TODO: Fix this, should return proper links?
    const getRedirectLink = () => {
        if (href.startsWith("/contracts")) {
            return "/contracts/list" as string;
        } else if (href.startsWith("/collection")) {
            return `/projects/list` as string;
        }
        return "" as string;
    };

    // localStorage.chainId is changed by rootRoute.validateSearch
    useEffect(() => {
        if (!safeWallets || !allNetworks?.length) {
            return;
        }

        // workaround due to this executing continually, curNetwork is initially undefined,
        // then this only re-runs if the localStorage.chainId is changed
        const safeNetworks = safeWallets.map((w) => Number(w.networkId));

        const networks = allNetworks.map((network) => ({
            ...network,
            safeDeployed: safeNetworks.indexOf(network.chainId) >= 0,
        }));

        setNetworks(networks);

        let network = find(networks, { chainId });
        // if for any reason the network is not found or now disabled (See: DEV-502), use the default
        if (!network) {
            network =
                find(networks, { default: true }) ??
                find(networks, {
                    // Assume CHAIND_ID_FALLBACK is a positive integer string
                    chainId: parseInt(CHAIN_ID_FALLBACK),
                });

            saveChainId((network as NetworkReadOnlyDeployed).chainId);
        }

        setCurNetwork(network as NetworkReadOnlyDeployed);
    }, [chainId, JSON.stringify(safeWallets), JSON.stringify(allNetworks)]);

    const handleChainIdUpdate = (networkItem: NetworkReadOnly) => {
        saveChainId(networkItem?.chainId);
        onClose();
    };

    return (
        <Flex
            pl={{
                base: 6,
                md: margin != undefined && margin >= 0 ? margin : 16,
            }}
            alignItems="center"
        >
            <Popover isLazy isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
                <PopoverTrigger>
                    <Button
                        px={4}
                        minWidth={{ base: 170, md: 240 }}
                        maxWidth={{ base: 170, md: 800 }}
                        justifyContent="flex-end"
                        bg="transparent"
                        borderColor="primary.100"
                        _hover={{
                            bg: "baseBg",
                        }}
                        rightIcon={<FiChevronDown />}
                    >
                        <Flex width={{ base: "80%", md: "100%" }}>
                            <FaCircle
                                color={
                                    curNetwork?.safeDeployed ? theme.colors.success["200"] : theme.colors.error["200"]
                                }
                            />
                            <Box
                                flex="1"
                                textAlign="left"
                                pl={2}
                                whiteSpace="nowrap"
                                overflow="hidden"
                                textOverflow="ellipsis"
                            >
                                {networks?.length
                                    ? curNetwork?.title ?? curNetwork?.name ?? curNetwork?.shortName
                                    : "No Networks"}
                            </Box>
                        </Flex>
                    </Button>
                </PopoverTrigger>
                <PopoverContent bgColor="baseBg">
                    <PopoverHeader>
                        <Heading size="ld">{networks?.length ? "Switch Network" : "No Networks"}</Heading>
                    </PopoverHeader>
                    <PopoverBody p={0} bgColor="baseBg" borderRadius="8px">
                        <List variant="dropdownItem">
                            {networks?.map((networkItem, idx) => (
                                <Link
                                    key={idx}
                                    to={getRedirectLink()}
                                    search={{}}
                                    params={{}}
                                    onClick={() => handleChainIdUpdate(networkItem)}
                                >
                                    <ListItem
                                        key={networkItem.id}
                                        className={networkItem.id === curNetwork?.id ? "selected" : ""}
                                    >
                                        <Flex>
                                            <div
                                                style={{
                                                    paddingTop: "4px",
                                                }}
                                            >
                                                <FaCircle
                                                    color={
                                                        networkItem?.safeDeployed
                                                            ? theme.colors.success["200"]
                                                            : theme.colors.error["200"]
                                                    }
                                                />
                                            </div>
                                            <Text ml={2}>
                                                {networkItem.title ?? networkItem.name ?? networkItem.shortName}
                                                {networkItem.id === curNetwork?.id ? " (current)" : ""}
                                            </Text>
                                        </Flex>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    );
};
