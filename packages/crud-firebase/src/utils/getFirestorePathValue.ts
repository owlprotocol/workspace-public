/**
 * Gets value from item at path key.subkey.subsubkey
 * @param item
 * @param path
 * @returns
 */
export function getFirestorePathValue(item: any, path: string | string[]) {
    let value = item;
    const keys = typeof path === "string" ? path.split(".") : path;

    keys.forEach((k) => {
        value = value[k];
    });
    return value;
}
