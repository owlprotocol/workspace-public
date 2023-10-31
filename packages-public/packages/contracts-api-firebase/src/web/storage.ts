import { FirebaseStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";

/*
 * Uploads a file to a storage bucket and returns the image's url.
 * Assumes `content` is a base64 string
 */
export async function uploadFile(
    storage: FirebaseStorage,
    content: Buffer | Blob,
    fileSuffix: string,
    owner: string,
): Promise<{ publicUrl: string; name: string }> {
    const filePrefix = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    const fileName = `${filePrefix}.${fileSuffix}`;
    const name = `users/${owner}/photos/${fileName}`;
    const storageRef = ref(storage, name);

    let publicUrl: string;
    try {
        await uploadBytes(storageRef, content, { customMetadata: { owner } });
        publicUrl = await getDownloadURL(storageRef);
    } catch (e) {
        throw new Error(`Error uploading file to Firebase Storage: ${e}`);
    }

    return { publicUrl, name };
}
