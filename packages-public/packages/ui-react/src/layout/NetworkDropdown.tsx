import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
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
import { DebouncedFunc, debounce, find } from "lodash-es";
import { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { Search2Icon } from "@chakra-ui/icons";
import { theme } from "../theme/index.js";
import { TabsComponent } from "../index.js";

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

    const [searchText, setSearchText] = useState<string>("");

    const handleSearchChange = debounce((event) => {
        setSearchText(event.target.value);
    }, 300);

    const handleNetworkDropdownClose = () => {
        setSearchText("");
        onClose();
    };

    // Filter networks based on title, name or chainId
    const filterNetworks = networks.filter(
        (network) =>
            (network.title || network.name || network.chainId.toString())
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
            network.chainId.toString().toLowerCase().includes(searchText.toLowerCase()),
    );

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

    const networkTabs = [
        {
            label: "All",
            component: (
                <NetworksList networks={filterNetworks} onClose={handleNetworkDropdownClose} curNetwork={curNetwork} />
            ),
        },
        {
            label: "Mainnets",
            component: (
                <NetworksList
                    networks={filterNetworks.filter((n) => !n.testnet)}
                    onClose={handleNetworkDropdownClose}
                    curNetwork={curNetwork}
                />
            ),
        },
        {
            label: "Testnets",
            component: (
                <NetworksList
                    networks={filterNetworks.filter((n) => n.testnet)}
                    onClose={handleNetworkDropdownClose}
                    curNetwork={curNetwork}
                />
            ),
        },
    ];

    return (
        <Flex
            pl={{
                base: 6,
                md: margin != undefined && margin >= 0 ? margin : 16,
            }}
            alignItems="center"
        >
            <Popover isLazy isOpen={isOpen} onOpen={onOpen} onClose={handleNetworkDropdownClose}>
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
                    <PopoverBody p={2} bgColor="baseBg" borderRadius="8px">
                        <SearchBar handleSearchChange={handleSearchChange} />
                        <TabsComponent tabs={networkTabs} />
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    );
};

type NetworksListProps = {
    networks: NetworkReadOnlyDeployed[];
    curNetwork?: NetworkReadOnlyDeployed;
    onClose: () => void;
};

const NetworksList = ({ networks, onClose, curNetwork }: NetworksListProps) => {
    const [, saveChainId] = useLocalStorage("chainId");
    const router = useRouter();
    const href: string = router.state.latestLocation?.href || "";
    const getRedirectLink = () => {
        if (href.startsWith("/contracts")) {
            return "/contracts/list" as string;
        } else if (href.startsWith("/collection")) {
            return `/projects/list` as string;
        }
        return "" as string;
    };

    const handleChainIdUpdate = (networkItem: NetworkReadOnly) => {
        saveChainId(networkItem?.chainId);
        onClose();
    };

    return (
        <List variant="dropdownItem">
            {networks?.map((networkItem, idx) => (
                <Link
                    key={idx}
                    to={getRedirectLink()}
                    search={{}}
                    params={{}}
                    onClick={() => handleChainIdUpdate(networkItem)}
                >
                    <ListItem key={networkItem.id} className={networkItem.id === curNetwork?.id ? "selected" : ""}>
                        <Flex gap={2} alignItems="center">
                            <FaCircle
                                color={
                                    networkItem?.safeDeployed ? theme.colors.success["200"] : theme.colors.error["200"]
                                }
                            />
                            <Text>
                                {networkItem.title ?? networkItem.name ?? networkItem.shortName}
                                {networkItem.id === curNetwork?.id ? " (current)" : ""}
                            </Text>
                        </Flex>
                    </ListItem>
                </Link>
            ))}
        </List>
    );
};

const SearchBar = ({ handleSearchChange }: { handleSearchChange: DebouncedFunc<(event: any) => void> }) => (
    <>
        <InputGroup size="sm" my={2}>
            <InputLeftElement pointerEvents="none" children={<Search2Icon color="gray.600" />} />
            <Input
                borderRadius="md"
                type="text"
                placeholder="Search..."
                border="1px solid"
                borderColor="input.border"
                _focus={{ outline: "none" }}
                onChange={(e) => handleSearchChange(e)}
            />
        </InputGroup>
    </>
);
