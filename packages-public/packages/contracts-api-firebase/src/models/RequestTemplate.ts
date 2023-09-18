import { OnlineTrait } from "./OnlineTraits.js";

export interface RequestTemplate {
    readonly id: string;
    // The userId of the owner
    readonly owner: string;
    onlineTraits: [OnlineTrait];
}
