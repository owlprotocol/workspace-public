/**
 * ChatMessage stored as subcollection under chatroom/<chatroomId>/message/<messageId>
 */
export interface ChatMessageId {
    id: string;
}

export interface ChatMessage {
    owner: string;
    role: "user" | "assistant";
    content: string;
    timestamp: number;
}
