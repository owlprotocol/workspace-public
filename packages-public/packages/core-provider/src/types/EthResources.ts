import {
    ERC1155BalanceResource,
    ERC20AllowanceResource,
    ERC20BalanceResource,
    ERC721Resource,
    EthBlockResource,
    EthBytecodeResource,
    EthLogAbiResource,
    EthLogResource,
    EthTransactionReceiptResource,
    EthTransactionResource,
} from "@owlprotocol/eth-firebase/models";

export interface EthResources {
    block: EthBlockResource;
    transaction: EthTransactionResource;
    transactionReceipt: EthTransactionReceiptResource;
    log: EthLogResource;
    logAbi: EthLogAbiResource;
    bytecode: EthBytecodeResource;
    erc20Balance?: ERC20BalanceResource;
    erc20Allowance?: ERC20AllowanceResource;
    erc721?: ERC721Resource;
    erc1155Balance?: ERC1155BalanceResource;
}
