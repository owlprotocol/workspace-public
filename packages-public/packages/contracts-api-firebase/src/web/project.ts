import { CollectionReference, DocumentData, doc, getDoc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { projectsCol } from "./config.js";
import { Project } from "../models/Project.js";

export async function createProject(
    projectsCol: CollectionReference<Project>,
    projectName: string,
    userId: string,
): Promise<{ projectId: string; project: Project }> {
    if (!userId) {
        console.error("userId required to create project");
        throw new Error("userId required to create project");
    }
    const projectId = crypto.randomUUID();
    //initial project data
    const project: Project = {
        projectName,
        projectId,
        userId,
    };

    await setDoc(projectsCol());

    return { projectId, project };
}

export async function getProject(id: string): Promise<Project> {
    const projectRef = doc(projectsCol, id);
    let projectSnapshot: DocumentData;
    try {
        projectSnapshot = await getDoc(projectRef);
    } catch (e) {
        if (e instanceof FirebaseError) {
            console.error(e);
            const firebaseError = e as FirebaseError;
            console.log(firebaseError.code);
            if (firebaseError.code === "permission-denied") {
                throw new Error("User not allowed to get document");
            }
            throw new Error(`Error getting document: ${firebaseError.message}`);
        }
        throw new Error(`Error getting document: ${e}`);
    }

    if (!projectSnapshot.exists()) {
        throw new Error("Project not found");
    }

    return projectSnapshot.data();
}
