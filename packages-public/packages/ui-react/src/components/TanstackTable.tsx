import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, Box, Text } from "@chakra-ui/react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

interface ReusableTableProps<T> {
    data: T[];
    columns: Array<ColumnDef<T, unknown>>;
    hideHeader?: boolean;
    itemsCentered?: boolean;
    isSeparated?: boolean;
    bgColor?: string;
    color?: string;
    border?: string;
    maxHeight?: string;
    onRowClick?: (row: T) => void;
}

export const TanstackTable = <T extends object>({
    data,
    columns,
    hideHeader = false,
    itemsCentered = false,
    isSeparated = false,
    bgColor = "baseBg",
    color = "baseText",
    border = "1px solid",
    maxHeight = "600px",
    onRowClick,
}: ReusableTableProps<T>) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const RenderTable = () => (
        <TableContainer borderRadius={10} bgColor="card.bg" border={border} borderColor="card.border" color={color}>
            <Box overflowY="auto" maxHeight={maxHeight}>
                <Table>
                    {!hideHeader && (
                        <Thead bgColor="card.headerBg">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <Tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header, idx) => (
                                        <Th
                                            textTransform="none"
                                            textAlign={idx === 0 ? "left" : "center"}
                                            key={header.id}
                                            fontSize={16}
                                            py={5}
                                            color="baseText"
                                            borderBottom="none"
                                        >
                                            {!header.isPlaceholder &&
                                                flexRender(header.column.columnDef.header, header.getContext())}
                                        </Th>
                                    ))}
                                </Tr>
                            ))}
                        </Thead>
                    )}
                    <Tbody bgColor={bgColor}>
                        {table.getRowModel().rows.map((row) => (
                            <Tr
                                key={row.id}
                                borderBottom={isSeparated ? "1px solid black" : "none"}
                                onClick={() => onRowClick && onRowClick(row.original)}
                                style={{
                                    cursor: onRowClick && "pointer",
                                }}
                                _hover={{
                                    backgroundColor: onRowClick && "baseHover",
                                }}
                            >
                                {row.getVisibleCells().map((cell, idx) => (
                                    <Td
                                        textAlign={itemsCentered ? "center" : idx === 0 ? "left" : "center"}
                                        key={cell.id}
                                        border="none"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </TableContainer>
    );

    return <>{data.length ? <RenderTable /> : <Text>No Data</Text>}</>;
};
