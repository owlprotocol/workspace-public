import { OnlineTrait } from "./OnlineTraits.js";

export interface RequestTemplate {
    // The userId of the owner
    owner: string;
    onlineTraits: [OnlineTrait];
    id?: string;
}
