import { Bucket } from "@google-cloud/storage";
import { MetadataResponse } from "@google-cloud/storage/build/src/nodejs-common";
import { v4 as uuidv4 } from "uuid";

export interface FileMetadata {
    projectId: string;
}

export function isFileMetadata(metadata: any): boolean {
    return "projectId" in metadata && typeof metadata.projectId == "string";
}

/*
 * Uploads a file to a storage bucket and returns the image's url.
 * Assumes `content` is a base64 string
 */
export async function uploadFile(
    bucket: Bucket,
    content: string,
    fileSuffix: string,
    projectId: string,
): Promise<{ publicUrl: string; name: string }> {
    const contentBuffer = Buffer.from(content, "base64");
    const uuid = uuidv4();
    const name = `projects/${projectId}/photos/${uuid}.${fileSuffix}`;
    const file = bucket.file(name);
    try {
        await file.save(contentBuffer);
        await file.setMetadata({ metadata: { projectId } });
        await file.makePublic();
    } catch (e) {
        console.error("Error uploading file to Firebase Storage: ", e);
        throw new Error("Error uploading file");
    }

    return { publicUrl: file.publicUrl(), name };
}

export async function getFileMetadata(bucket: Bucket, fileName: string): Promise<Record<string, any>> {
    let metadataResponse: MetadataResponse;
    try {
        metadataResponse = await bucket.file(fileName).getMetadata();
    } catch (e) {
        throw new Error("Error getting file metadata");
    }

    const metadata = metadataResponse[0];
    if (!metadata) {
        throw new Error("File not found");
    }
    if (!("metadata" in metadata && isFileMetadata(metadata.metadata))) {
        throw new Error("Unexpected file metadata");
    }
    return metadata.metadata as FileMetadata;
}

export async function deleteFile(bucket: Bucket, fileName: string, projectId: string): Promise<void> {
    const fileMetadata = await getFileMetadata(bucket, fileName);

    if (fileMetadata.projectId !== projectId) {
        throw new Error("Can't delete a file that you don't own");
    }
}
