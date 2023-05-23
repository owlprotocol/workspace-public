import { Box, Button, SimpleGrid, useTheme } from "@chakra-ui/react";
import {
    ColumnDef,
    getCoreRowModel,
    getSortedRowModel,
    Row,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import {
    QueryClient,
    QueryClientProvider,
    useInfiniteQuery,
} from "@tanstack/react-query";
import { useVirtual } from "react-virtual";
import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { CollectionCardPresenter } from "../../../NFT";
import { ApiResponse, Item, fetchData } from "./dataFaker";
import { FiltersDrawer } from "./FiltersDrawer";

const fetchSize = 25;

const VirtualComponent = () => {
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [sorting, setSorting] = useState<SortingState>([]);

    const columns = useMemo<ColumnDef<Item>[]>(
        () => [
            {
                accessorKey: "networkId",
                header: "networkId",
            },
            {
                accessorKey: "address",
                header: "address",
            },
            {
                accessorKey: "title",
                header: "title",
            },
            {
                accessorKey: "isVerified",
                header: "isVerified",
            },
            {
                accessorKey: "description",
                header: "description",
            },
            {
                accessorKey: "assetAvatarSrc",
                header: "assetAvatarSrc",
            },
            {
                accessorKey: "assetPreviewSrc",
                header: "assetPreviewSrc",
            },
        ],
        []
    );

    const { data, fetchNextPage, isFetching, isLoading } =
        useInfiniteQuery<ApiResponse>(
            ["table-data", sorting], //adding sorting state as key causes table to reset and fetch from new beginning upon sort
            async ({ pageParam = 0 }) => {
                const start = pageParam * fetchSize;
                const fetchedData = fetchData(start, fetchSize, sorting); //pretend api call
                return fetchedData;
            },
            {
                getNextPageParam: (_lastGroup, groups) => groups.length,
                keepPreviousData: true,
                refetchOnWindowFocus: false,
            }
        );

    const flatData = useMemo(
        () => data?.pages?.flatMap((page) => page.data) ?? [],
        [data]
    );
    const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
    const totalFetched = flatData.length;

    //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
    const fetchMoreOnBottomReached = useCallback(
        (containerRefElement?: HTMLDivElement | null) => {
            if (containerRefElement) {
                const { scrollHeight, scrollTop, clientHeight } =
                    containerRefElement;
                //once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
                if (
                    scrollHeight - scrollTop - clientHeight < 300 &&
                    !isFetching &&
                    totalFetched < totalDBRowCount
                ) {
                    fetchNextPage();
                }
            }
        },
        [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
    );

    useEffect(() => {
        fetchMoreOnBottomReached(tableContainerRef.current);
    }, [fetchMoreOnBottomReached]);

    const table = useReactTable({
        data: flatData,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    });

    const { rows } = table.getRowModel();
    const rowVirtualizer = useVirtual({
        parentRef: tableContainerRef,
        size: rows.length,
        overscan: 10,
    });
    const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
    const { themes } = useTheme();

    if (isLoading) {
        return <>Loading...</>;
    }

    return (
        <SimpleGrid
            ref={tableContainerRef}
            onScroll={(e) =>
                fetchMoreOnBottomReached(e.target as HTMLDivElement)
            }
            spacing={4}
            columns={[1, 2, 2, 4]}
        >
            {virtualRows.map((virtualRow: any) => {
                const row = rows[virtualRow.index] as Row<Item>;
                const networkId = row.getValue("networkId");
                const address = row.getValue("address");
                const title = row.getValue("title");
                const isVerified = row.getValue("isVerified");
                const description = row.getValue("description");
                const assetAvatarSrc = row.getValue("assetAvatarSrc");
                const assetPreviewSrc = row.getValue("assetPreviewSrc");

                const itemData = {
                    networkId,
                    address,
                    title,
                    isVerified,
                    description,
                    assetAvatarSrc,
                    assetPreviewSrc,
                };

                return (
                    <Box
                        key={row.id}
                        _hover={{ transform: "scale(1.05)" }}
                        transition={"300ms ease-in-out"}
                    >
                        <a href={`/explore/${address}?networkId=${networkId}`}>
                            <CollectionCardPresenter {...itemData} />
                        </a>
                    </Box>
                );
            })}
        </SimpleGrid>
    );
};

const queryClient = new QueryClient();
const NFTCollectionInfiniteGridPresenter = () => (
    <QueryClientProvider client={queryClient}>
        <FiltersDrawer />

        <br />
        <VirtualComponent />
    </QueryClientProvider>
);

export { NFTCollectionInfiniteGridPresenter };
