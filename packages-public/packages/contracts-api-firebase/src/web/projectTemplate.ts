import { getDocs } from "firebase/firestore";
import { projectTemplatesCol } from "./config.js";
import { ProjectTemplate } from "../models/ProjectTemplate.js";

export async function getProjectTemplates(): Promise<ProjectTemplate[]> {
    let projectTemplates: ProjectTemplate[];
    try {
        const projectTemplatesSnap = await getDocs(projectTemplatesCol);
        projectTemplates = projectTemplatesSnap.docs.map((doc) => doc.data());
    } catch (e) {
        console.error(`Error getting templates in firestore: ${e}`);
        throw e;
    }
    return projectTemplates;
}
