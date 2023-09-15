import { DocumentData, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { projectsCol } from "./config.js";
import { Project } from "../models/Project.js";

export async function createProject(
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

    await setDoc(doc(projectsCol, projectId), project);

    return { projectId, project };
}

export async function getProjectById(id: string): Promise<Project> {
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

export async function getProjectsByUserId(userId: string): Promise<Project[]> {
    let projects: Project[];
    try {
        const projectQuery = query(projectsCol, where("userId", "==", userId));
        const projectSnapshot = await getDocs(projectQuery);
        projects = projectSnapshot.docs.map((doc) => doc.data());
    } catch (e) {
        console.error(`Error getting projects: ${e}`);
        throw e;
    }
    return projects;
}
