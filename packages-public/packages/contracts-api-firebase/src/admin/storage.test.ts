import { describe, test, expect } from "vitest";
import fetch from "node-fetch";
import { bucket } from "@owlprotocol/crud-firebase/admin";
import { readFileSync } from "fs";
import { uploadFile } from "./storage.js";

describe("storage.test.ts", async () => {
    const testFilePath = "./testdata/owl.jpg";
    const testFileSuffix = "jpg";

    test("uploadFile", async () => {
        const file = readFileSync(testFilePath);
        const content = file.toString("base64");
        const owner = "owner";
        const { publicUrl, name } = await uploadFile(bucket, content, testFileSuffix, owner);
        expect(publicUrl).toBeDefined();
        expect(name).toBeDefined();

        const response = await fetch(publicUrl);
        expect(response.body).not.toBeNull();
        const responseBuffer = response.body!.read();
        expect(responseBuffer).toEqual(file);

        const metadataResponse = await bucket.file(name).getMetadata();
        const fileMetadata = metadataResponse[0];
        expect(fileMetadata).toBeDefined();
        const { metadata } = fileMetadata as Record<string, any>;
        expect(metadata).toBeDefined();
        expect(metadata).toEqual({ owner });
    });
});
