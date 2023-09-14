import { getDocs } from "firebase/firestore";
import { templatesCol } from "./config.js";
import { Template } from "../models/Template.js";

export async function getTemplates(): Promise<Template[]> {
    let templates: Template[];
    try {
        const templatesSnap = await getDocs(templatesCol);
        templates = templatesSnap.docs.map((doc) => doc.data());
    } catch (e) {
        console.error(`Error getting templates in firestore: ${e}`);
        throw e;
    }
    return templates;
}
