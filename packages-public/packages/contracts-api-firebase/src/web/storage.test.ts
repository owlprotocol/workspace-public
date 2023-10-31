import { describe, test, expect, beforeAll } from "vitest";
import fetch from "node-fetch";
import { storage } from "@owlprotocol/crud-firebase/web";
import { getMetadata, ref } from "firebase/storage";
import crypto from "node:crypto";
import { readFileSync } from "fs";
import { uploadFile } from "./storage.js";

describe("storage.test.ts", async () => {
    const testFilePath = "./testdata/owl.jpg";
    const testFileSuffix = "jpg";

    beforeAll(() => {
        //TODO: Fix, using global crypto in web sdk
        //@ts-expect-error
        global.crypto = crypto;
    });

    test("uploadFile", async () => {
        const file = readFileSync(testFilePath);
        const owner = "test-owner";

        const { publicUrl, name } = await uploadFile(storage, file, testFileSuffix, owner);

        const response = await fetch(publicUrl);
        expect(response.body).not.toBeNull();
        const responseBuffer = response.body!.read();
        expect(responseBuffer).toEqual(file);

        const metadataResponse = await getMetadata(ref(storage, name));
        const fileMetadata = metadataResponse.customMetadata;
        expect(fileMetadata).toBeDefined();
        expect(fileMetadata).toEqual({ owner });
    });
});
