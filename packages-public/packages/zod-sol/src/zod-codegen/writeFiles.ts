import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname } from "path";
import { mapValues } from "../lodash.js";

export function writeFiles(files: Record<string, string>) {
    mapValues(files, (content, path) => {
        const dir = dirname(path);
        if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
        writeFileSync(path, content);
    });
}
