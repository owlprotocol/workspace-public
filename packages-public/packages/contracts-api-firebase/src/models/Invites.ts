export interface Invites {
    readonly id: string;
    readonly senderEmail: string;
    readonly recipientEmail: string;
    readonly timestamp: number;
    // readonly status: "pending" | "accepted" | "declined" | "expired";
}
