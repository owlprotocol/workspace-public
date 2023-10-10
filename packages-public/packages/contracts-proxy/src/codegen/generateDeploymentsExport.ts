import { readdirSync, writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";

export function generateDeploymentsExport() {
    const deploymentsFolder = "src/deployments";
    if (!existsSync(deploymentsFolder)) {
        mkdirSync(deploymentsFolder);
    }

    const networks = readdirSync(deploymentsFolder);
    networks.forEach((n) => {
        if (n != "index.ts") {
            let deploymentsExport = "";
            deploymentsExport = `${deploymentsExport}/* eslint-disable import/no-unresolved */\n`;
            deploymentsExport = `${deploymentsExport}// @ts-nocheck\n`;

            const deployments = readdirSync(`${deploymentsFolder}/${n}`);
            deployments.forEach((f) => {
                if (f.endsWith(".json")) {
                    const n = f.replace(".json", "");
                    deploymentsExport = `${deploymentsExport}export * as ${n.replace("-", "")} from "./${n}.js";\n`;
                } else if (f == ".chainId") {
                    const chainId = readFileSync(`${deploymentsFolder}/${n}/${f}`, "utf-8");
                    deploymentsExport = `${deploymentsExport}export const chainId = "${chainId}";\n`;
                }
            });
            writeFileSync(`${deploymentsFolder}/${n}/index.ts`, deploymentsExport);
        }
    });
}
