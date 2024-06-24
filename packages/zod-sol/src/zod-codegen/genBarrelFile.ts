/**
 * Generate barrel file, and index file that just re-exports all files
 * @param files list of file paths to export
 */
export function genBarrelFile(files: readonly string[]): string {
    return files.map((f) => `export * from "${f}";`).join("\n");
}
