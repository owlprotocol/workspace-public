import { OnlineTrait } from "./OnlineTrait.js";

export interface RequestTemplate {
    readonly id: string;
    // The userId of the owner
    readonly owner: string;
    readonly onlineTraits: OnlineTrait[];
}
