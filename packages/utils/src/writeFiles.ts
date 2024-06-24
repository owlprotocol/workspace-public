import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname } from "path";

export function writeFiles(files: Record<string, string>) {
    Object.entries(files).forEach(([path, content]) => {
        const dir = dirname(path);
        if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
        writeFileSync(path, content);
    });
}
