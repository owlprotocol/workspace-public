import { Bucket } from "@google-cloud/storage";
import { MetadataResponse } from "@google-cloud/storage/build/src/nodejs-common";
import { TRPCError } from "@trpc/server";
import crypto from "node:crypto";

export interface FileMetadata {
    owner: string;
}

export function isFileMetadata(metadata: any): boolean {
    return "owner" in metadata && typeof metadata.owner == "string";
}

/*
 * Uploads a file to a storage bucket and returns the image's url.
 * Assumes `content` is a base64 string
 */
export async function uploadFile(
    bucket: Bucket,
    content: string,
    fileSuffix: string,
    owner: string,
): Promise<{ publicUrl: string; name: string }> {
    const contentBuffer = Buffer.from(content, "base64");
    const uuid = crypto.randomUUID();
    const name = `${uuid}.${fileSuffix}`;
    const file = bucket.file(name);
    try {
        await file.save(contentBuffer);
        await file.setMetadata({ metadata: { owner } });
    } catch (e) {
        console.error("Error uploading file to Firebase Storage: ", e);
        throw new TRPCError({ message: "Error uploading file", code: "INTERNAL_SERVER_ERROR" });
    }

    return { publicUrl: file.publicUrl(), name: name };
}

export async function getFileMetadata(bucket: Bucket, fileName: string): Promise<Record<string, any>> {
    let metadataResponse: MetadataResponse;
    try {
        metadataResponse = await bucket.file(fileName).getMetadata();
    } catch (e) {
        throw new TRPCError({ message: "Error getting file metadata", code: "INTERNAL_SERVER_ERROR" });
    }

    const metadata = metadataResponse[0];
    if (!metadata) {
        throw new TRPCError({ message: "File not found", code: "INTERNAL_SERVER_ERROR" });
    }
    if (!("metadata" in metadata && isFileMetadata(metadata.metadata))) {
        throw new TRPCError({ message: "Unexpected file metadata", code: "INTERNAL_SERVER_ERROR" });
    }
    return metadata.metadata as FileMetadata;
}

export async function deleteFile(bucket: Bucket, fileName: string, userId: string): Promise<void> {
    const fileMetadata = await getFileMetadata(bucket, fileName);
    const { owner } = fileMetadata;

    if (owner != userId) {
        throw new TRPCError({
            message: "Can't delete a file that you don't own",
            code: "UNAUTHORIZED",
        });
    }
}
