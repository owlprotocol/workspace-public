import { Flex, Image, Spinner, Text, useColorMode } from "@chakra-ui/react";
import { useUser } from "@clerk/clerk-react";
import { trpc } from "@owlprotocol/contracts-api-client-trpc/react";
import {
    ethLogsHooks,
    networksReadOnlyHooks,
    safeWalletsReadOnlyHooks,
} from "@owlprotocol/contracts-api-firebase/hooks";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export type TransactionOrLogRowData = {
    title: string;
    txHash: string;
    blockNumber: number;
    isConfirmed?: boolean;
    isSend: boolean;
    contractAddress?: string;
    value?: string;
};

export const WalletActivity = () => {
    const { colorMode } = useColorMode();
    const lightMode = colorMode === "light";
    const { user } = useUser();
    const userId = user?.id;
    const [chainId] = useLocalStorage<number>("chainId");

    const [safeWallet, safeWalletOptions] = safeWalletsReadOnlyHooks.useGetWhereFirst(
        chainId && userId
            ? {
                  networkId: chainId.toString(),
                  owner: userId,
              }
            : {},
    );

    const address = safeWallet?.address;

    // TODO: fix issue with all transactions
    // const [allTransactions, allTransactionsOptions] =
    //     ethTransactionsHooks.useGetWhere(
    //         address && chainId
    //             ? {
    //                   addressTouched: { [address]: true },
    //                   networkId: chainId.toString(),
    //               }
    //             : {},
    //         { limit: 20, orderBy: "blockNumber", order: "desc" }
    //     );

    const [fromLogs, fromLogsOptions] = ethLogsHooks.useGetWhere(
        address && chainId
            ? {
                  dataDecoded: { from: address },
                  networkId: chainId.toString(),
              }
            : {},
    );

    const [toLogs, toLogsOptions] = ethLogsHooks.useGetWhere(
        address && chainId
            ? {
                  dataDecoded: { to: address },
                  networkId: chainId.toString(),
              }
            : {},
    );

    if (safeWalletOptions.status === "error") {
        return (
            <Text pt={5} color="error.200">
                An error occurred while getting your safe wallet. Please try again.
            </Text>
        );
    }

    if (safeWalletOptions.status !== "success" || !safeWallet) {
        return <Spinner />;
    }

    if (
        // allTransactionsOptions.status === "error"
        // allTransactionsOptions.status === "error" ||
        fromLogsOptions.status === "error" ||
        toLogsOptions.status === "error"
    ) {
        return (
            <Text pt={5} color="error.200">
                An error occurred while getting your transaction activity. Please try again.
            </Text>
        );
    }

    if (
        // allTransactionsOptions.status !== "success"
        // allTransactionsOptions.status !== "success" ||
        fromLogsOptions.status !== "success" ||
        toLogsOptions.status !== "success"
    ) {
        return <Spinner />;
    }

    const transactionsAndLogs: TransactionOrLogRowData[] = [];

    // allTransactions?.forEach((tx) => {
    //     transactionsAndLogs.push({
    //         title: "Transaction",
    //         txHash: tx.hash,
    //         blockNumber: tx.blockNumber || 0,
    //         isConfirmed: tx.confirmations > 0,
    //         isSend: tx.to === safeWallet.address,
    //     });
    // });

    // TODO: refactor to group from and to logs by transaction
    fromLogs?.forEach((log) => {
        // const tx = allTransactions?.find(
        //     (tx) => tx.hash === log.transactionHash
        // );
        transactionsAndLogs.push({
            title: `${log.eventName}`,
            txHash: log.transactionHash,
            blockNumber: log.blockNumber,
            // isConfirmed: !!tx && tx.confirmations > 0,
            isSend: true,
            value: log.dataDecoded.value,
            contractAddress: log.address,
        });
    });

    toLogs?.forEach((log) => {
        // const tx = allTransactions?.find(
        //     (tx) => tx.hash === log.transactionHash
        // );

        transactionsAndLogs.push({
            title: `${log.eventName}`,
            txHash: log.transactionHash,
            blockNumber: log.blockNumber,
            // isConfirmed: !!tx && tx.confirmations > 0,
            isSend: false,
            value: log.dataDecoded.value,
            contractAddress: log.address,
        });
    });

    if (!transactionsAndLogs?.length) {
        return (
            <>
                <Image src={`/sadGlobe${lightMode ? "" : "-white"}.svg`} h={90} w={90} />
                No Activity..
            </>
        );
    }

    return (
        <Flex direction="column" width="100%" gap={4}>
            {transactionsAndLogs
                .sort((a, b) => b.blockNumber - a.blockNumber)
                ?.map((transactionOrLog, idx) => (
                    <TransactionRow key={idx} transactionOrLog={transactionOrLog} />
                ))}
        </Flex>
    );
};

const TransactionRow = ({ transactionOrLog }: { transactionOrLog: TransactionOrLogRowData }) => {
    const [value, setValue] = useState("");
    const [symbol, setSymbol] = useState("");
    const [chainId] = useLocalStorage<number>("chainId");

    const [networkInfo] = networksReadOnlyHooks.useGet(chainId.toString());
    const networkExplorerUrl = networkInfo?.explorer ?? "";
    const { mutate: erc20DecimalMutation, isLoading: erc20DecimalLoading } =
        trpc.interfaces.IERC20Metadata.decimals.useMutation();
    const { mutate: erc20SymbolMutation, isLoading: erc20SymbolLoading } =
        trpc.interfaces.IERC20Metadata.symbol.useMutation();

    useEffect(() => {
        if (!transactionOrLog.contractAddress || !transactionOrLog.value || !chainId) {
            return;
        }

        erc20DecimalMutation(
            {
                networkId: chainId.toString(),
                address: transactionOrLog.contractAddress,
            },
            {
                onSuccess: (data) => {
                    const decimal = data.result[0];
                    const amountOfUnits = ethers.utils.formatUnits(
                        ethers.BigNumber.from(transactionOrLog.value?.toString()),
                        ethers.BigNumber.from(decimal),
                    );
                    setValue(amountOfUnits);
                },
                // On error don't set the value and symbol
            },
        );
        erc20SymbolMutation(
            {
                networkId: chainId.toString(),
                address: transactionOrLog.contractAddress,
            },
            {
                onSuccess: (data) => {
                    setSymbol(data.result[0]);
                },
            },
        );
    }, [transactionOrLog, chainId]);

    if (erc20DecimalLoading || erc20SymbolLoading) {
        return <Spinner />;
    }

    const transactionValueToDisplay =
        value.length && symbol.length ? `${transactionOrLog.isSend ? "-" : "+"}${value} ${symbol}` : null;

    return (
        <Flex gap={4} alignItems="center" justifyContent="space-between">
            <Flex gap={4}>
                <Image
                    src={transactionOrLog.isSend ? "../../walletActivityIcon.svg" : "../../walletActivityReceive.svg"}
                    alt="wallet activity icon"
                />
                <Flex direction="column" justifyContent="space-between">
                    <a
                        href={`${networkExplorerUrl}/tx/${transactionOrLog.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Text as="b">{transactionOrLog.title}</Text>
                    </a>
                    <Text as="b" color={transactionOrLog.isConfirmed ? "green" : "warning.200"}>
                        {transactionOrLog.isConfirmed ? "Confirmed" : "Pending"}
                    </Text>
                </Flex>
            </Flex>
            <Flex>
                <Text fontWeight="bold">{transactionValueToDisplay}</Text>
            </Flex>
        </Flex>
    );
};
