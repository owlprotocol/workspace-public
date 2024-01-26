import { FirebaseStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";

/*
 * Uploads a file to a storage bucket and returns the image's url.
 */
export async function uploadFile(
    storage: FirebaseStorage,
    content: Buffer | Blob,
    fileSuffix: string,
    projectId: string,
): Promise<{ publicUrl: string; name: string }> {
    const uuid = crypto.randomUUID();
    const name = `projects/${projectId}/photos/${uuid}.${fileSuffix}`;
    const storageRef = ref(storage, name);

    let publicUrl: string;
    try {
        await uploadBytes(storageRef, content, { customMetadata: { projectId } });
        publicUrl = await getDownloadURL(storageRef);
    } catch (e) {
        throw new Error(`Error uploading file to Firebase Storage: ${e}`);
    }

    return { publicUrl, name };
}
