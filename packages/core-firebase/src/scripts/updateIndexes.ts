import {
    ethBlockGroupPath,
    EthBlockFieldOverrides,
    ethTransactionGroupPath,
    EthTransactionFieldOverrides,
    ethTransactionReceiptGroupPath,
    EthTransactionReceiptFieldOverrides,
    erc1155BalanceGroupPath,
    ERC1155BalanceFieldOverrides,
    erc20AllowanceGroupPath,
    ERC20AllowanceFieldOverrides,
    erc20BalanceGroupPath,
    ERC20BalanceFieldOverrides,
    erc20GroupPath,
    ERC20FieldOverrides,
    erc721GroupPath,
    ERC721FieldOverrides,
    ethLogGroupPath,
    EthLogFieldOverrides,
    ethUserOpGroupPath,
    EthUserOpFieldOverrides,
    erc1155GroupPath,
    ERC1155FieldOverrides,
} from "@owlprotocol/eth-firebase";
import { FieldOverride, toFieldOverride, IndexesFieldOverridesJson } from "@owlprotocol/crud-firebase";
import { mapValues } from "lodash-es";
import { ESLint } from "eslint";
import { writeFileSync } from "fs";
import { projectApiKeyGroupPath, teamMemberGroupPath, teamNetworkGroupPath } from "../collections.js";
import { ProjectApiKeyFieldOverrides, TeamMemberFieldOverrides, TeamNetworkFieldOverrides } from "../models/index.js";

export function getFieldOverrides(): FieldOverride[] {
    //ethmodels
    const ethBlockFields = mapValues(EthBlockFieldOverrides, (fieldOverrideDef, fieldPath) =>
        toFieldOverride(ethBlockGroupPath, fieldPath, fieldOverrideDef),
    );
    const ethTransactionFields = mapValues(EthTransactionFieldOverrides, (fieldOverrideDef, fieldPath) =>
        toFieldOverride(ethTransactionGroupPath, fieldPath, fieldOverrideDef),
    );
    const ethTransactionReceiptFields = mapValues(EthTransactionReceiptFieldOverrides, (fieldOverrideDef, fieldPath) =>
        toFieldOverride(ethTransactionReceiptGroupPath, fieldPath, fieldOverrideDef),
    );
    const ethLogFields = mapValues(EthLogFieldOverrides, (fieldOverrideDef, fieldPath) =>
        toFieldOverride(ethLogGroupPath, fieldPath, fieldOverrideDef),
    );
    const ethUserOpFields = mapValues(EthUserOpFieldOverrides, (fieldOverrideDef, fieldPath) =>
        toFieldOverride(ethUserOpGroupPath, fieldPath, fieldOverrideDef),
    );

    //contract models
    const erc20Fields = mapValues(ERC20FieldOverrides, (fieldOverrideDef, fieldPath) =>
        toFieldOverride(erc20GroupPath, fieldPath, fieldOverrideDef),
    );
    const erc20BalanceFields = mapValues(ERC20BalanceFieldOverrides, (fieldOverrideDef, fieldPath) =>
        toFieldOverride(erc20BalanceGroupPath, fieldPath, fieldOverrideDef),
    );
    const erc20AllowanceFields = mapValues(ERC20AllowanceFieldOverrides, (fieldOverrideDef, fieldPath) =>
        toFieldOverride(erc20AllowanceGroupPath, fieldPath, fieldOverrideDef),
    );
    const erc721Fields = mapValues(ERC721FieldOverrides, (fieldOverrideDef, fieldPath) =>
        toFieldOverride(erc721GroupPath, fieldPath, fieldOverrideDef),
    );
    const erc1155Fields = mapValues(ERC1155FieldOverrides, (fieldOverrideDef, fieldPath) =>
        toFieldOverride(erc1155GroupPath, fieldPath, fieldOverrideDef),
    );
    const erc1155BalanceFields = mapValues(ERC1155BalanceFieldOverrides, (fieldOverrideDef, fieldPath) =>
        toFieldOverride(erc1155BalanceGroupPath, fieldPath, fieldOverrideDef),
    );

    //team
    const teamMemberFields = mapValues(TeamMemberFieldOverrides, (fieldOverrideDef, fieldPath) =>
        toFieldOverride(teamMemberGroupPath, fieldPath, fieldOverrideDef),
    );
    const teamNetworkFields = mapValues(TeamNetworkFieldOverrides, (fieldOverrideDef, fieldPath) =>
        toFieldOverride(teamNetworkGroupPath, fieldPath, fieldOverrideDef),
    );
    //project
    const projectApiKeyFields = mapValues(ProjectApiKeyFieldOverrides, (fieldOverrideDef, fieldPath) =>
        toFieldOverride(projectApiKeyGroupPath, fieldPath, fieldOverrideDef),
    );

    return [
        ...Object.values(teamMemberFields),
        ...Object.values(teamNetworkFields),
        ...Object.values(projectApiKeyFields),
        ...Object.values(ethBlockFields),
        ...Object.values(ethTransactionFields),
        ...Object.values(ethTransactionReceiptFields),
        ...Object.values(ethLogFields),
        ...Object.values(ethUserOpFields),
        ...Object.values(erc20Fields),
        ...Object.values(erc20BalanceFields),
        ...Object.values(erc20AllowanceFields),
        ...Object.values(erc721Fields),
        ...Object.values(erc1155Fields),
        ...Object.values(erc1155BalanceFields),
    ];
}

export async function updateIndexes(indexesPath = "./firestore.indexes.json") {
    const indexesFieldOverrides: IndexesFieldOverridesJson = {
        indexes: [],
        fieldOverrides: getFieldOverrides(),
    };

    writeFileSync(indexesPath, JSON.stringify(indexesFieldOverrides));

    const eslint = new ESLint({ useEslintrc: true, fix: true });
    const results = await eslint.lintFiles([indexesPath]);
    await ESLint.outputFixes(results);
}

updateIndexes();
