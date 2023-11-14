/**
 * ChatMessage stored as subcollection under chatroom/<roomId>/message/<messageId>
 */
export interface ChatRoomId {
    id: string;
}

export type ChatRoomMode = "user" | "creator"; // | "investor" | "trader"
export interface ChatRoom {
    owner: string;
    telegramChatId: number;
    mode: ChatRoomMode;
    //Last time user activated chat
    lastActiveTimestamp?: number;
}
