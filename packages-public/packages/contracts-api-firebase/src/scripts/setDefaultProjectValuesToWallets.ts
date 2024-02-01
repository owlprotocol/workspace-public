import { dfnsWalletsReadOnlyCRUD, safeWalletsReadOnlyCRUD } from "../admin/crudWrappers.js";
import { DfnsWalletReadOnly, SafeWalletReadOnly } from "../models/index.js";

async function setDefaultProjectValuesToWallets() {
    const safeWalletsToUpdate: SafeWalletReadOnly[] = [];
    const safeWallets = await safeWalletsReadOnlyCRUD._getAll();
    safeWallets.forEach((safe) => {
        if (safe.isProjectWallet === undefined) {
            const updatedSafe = { ...safe, isProjectWallet: false };
            safeWalletsToUpdate.push(updatedSafe);
        }
    });

    const dfnsWalletsToUpdate: DfnsWalletReadOnly[] = [];
    const dfnsWallets = await dfnsWalletsReadOnlyCRUD._getAll();
    dfnsWallets.forEach((dfns) => {
        if (dfns.isProjectWallet === undefined) {
            const updatedDfns = { ...dfns, isProjectWallet: false };
            dfnsWalletsToUpdate.push(updatedDfns);
        }
    });

    await Promise.all([
        safeWalletsReadOnlyCRUD._updateBatch(safeWalletsToUpdate),
        dfnsWalletsReadOnlyCRUD._updateBatch(dfnsWalletsToUpdate),
    ]);
}

async function main() {
    await setDefaultProjectValuesToWallets();
}

main().catch(console.error);
