import { writeFileSync, readdirSync } from "fs";
import { basename, join } from "path";

/**
 * What type of export to include (where $module is file name)
 *   - named: Export everything in name as is. `export * from "./$module.ts"`
 *   - namedModule: Export only named export that has same name as file. Note that this can break if file doesn't export this.
 *   - default: Export default as the name of the file. `export { default as $module } from "./$module.ts"`
 *   - all: Export named and default. `export *, { default as $module } from "./$module.ts"`
 */
type ExportType = "named" | "namedModule" | "default" | "all";

export function exportForFile(f: string, type: ExportType = "named"): string {
    const fClean = f.replace(".ts", ".js");
    const module = basename(f).replace(".js", "");
    if (type === "named") {
        return `export * from "${fClean}";`;
    } else if (type === "namedModule") {
        return `export { ${module} } from "${fClean}";`;
    } else if (type === "default") {
        return `export { default as ${module}} from "${fClean}";`;
    } else if (type === "all") {
        return `export *, { default as ${module}} from "${fClean}";`;
    } else {
        throw new Error(`Invalid export type ${type}`);
    }
}

/**
 * Generate barrel file content, an index file that just re-exports all files
 * @param files list of file paths to export
 */
export function generateBarrelFileContentForModules(files: readonly string[], type: ExportType = "named"): string {
    return files.map((f) => exportForFile(f, type)).join("\n") + "\n";
}

/**
 * Generate barrel file content, an index file that just re-exports all files
 * @param path path of directory (only includes files of depth 1)
 */
export function generateBarrelFileContentForDir(path: string, type: ExportType = "named"): string {
    const files = readdirSync(path)
        .map((f) => `./${f.replace(".ts", ".js")}`)
        .filter((f) => basename(f) !== "index.js");
    const barrelFileContents = generateBarrelFileContentForModules(files, type);

    return barrelFileContents;
}

/**
 * Generate barrel file, an index file that just re-exports all files
 * @param path path of directory (only includes files of depth 1)
 */
export function generateBarrelFileForDir(path: string, type: ExportType = "named") {
    const barrelFilePath = join(path, "index.ts");
    const barrelFileContents = generateBarrelFileContentForDir(path, type);

    writeFileSync(barrelFilePath, barrelFileContents);
}
