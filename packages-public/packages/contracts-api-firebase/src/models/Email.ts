export interface Email {
    readonly id: string;
    // Recipient
    readonly to: string[];
    readonly message: {
        // Email subject
        subject: string;
        // Email body
        html: string;
    };
}
