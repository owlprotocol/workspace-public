import { writeFileSync, readdirSync } from "fs";
import { basename, join } from "path";

/**
 * Generate barrel file content, an index file that just re-exports all files
 * @param files list of file paths to export
 */
export function generateBarrelFileContentForModules(files: readonly string[]): string {
    return files.map((f) => `export * from "${f.replace(".ts", ".js")}";`).join("\n") + "\n";
}

/**
 * Generate barrel file content, an index file that just re-exports all files
 * @param path path of directory (only includes files of depth 1)
 */
export function generateBarrelFileContentForDir(path: string): string {
    const files = readdirSync(path)
        .map((f) => `./${f.replace(".ts", ".js")}`)
        .filter((f) => basename(f) !== "index.js");
    const barrelFileContents = generateBarrelFileContentForModules(files);

    return barrelFileContents;
}

/**
 * Generate barrel file, an index file that just re-exports all files
 * @param path path of directory (only includes files of depth 1)
 */
export function generateBarrelFileForDir(path: string) {
    const barrelFilePath = join(path, "index.ts");
    const barrelFileContents = generateBarrelFileContentForDir(path);

    writeFileSync(barrelFilePath, barrelFileContents);
}
