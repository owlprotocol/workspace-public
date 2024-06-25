/**
 * Generate random string from characters.
 * Useful for generating friendly short codes / ids. (prefer using `uuid` for uniqueness guarantees)
 * @param length
 * @param chars list of characters to chose from. Default `0123456789abcdefghijklmnpqrstuvwxyz` (exclude `o`)
 * @returns Random string of length `length`
 */
export function randomString(length: number, chars = "0123456789abcdefghijklmnpqrstuvwxyz"): string {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}
