import { deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import * as crypto from "crypto";
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
        name: projectName,
        id: projectId,
        userId,
    };

    await setDoc(doc(projectsCol, projectId), project);

    return { projectId, project };
}

/**
 * @dev Get all projects. Should enforce security rules. Used mostly for testing
 */
export async function getProjectsAll(): Promise<Project[]> {
    const snapshot = await getDocs(projectsCol);
    return snapshot.docs.map((d) => d.data());
}

/**
 * @dev Delete all projects. Should enforce security rules. Used mostly for testing.
 */
export async function deleteProjectsAll(): Promise<void[]> {
    const snapshot = await getDocs(projectsCol);
    return Promise.all(snapshot.docs.map((d) => deleteDoc(doc(projectsCol, d.id))));
}

/**
 * @dev Get project by id.
 * @param id
 * @returns
 * @throws FirebaseError permission-denied
 * @throws FirebaseError other errors
 * @throws Project not found
 */
export async function getProjectById(id: string): Promise<Project> {
    const projectRef = doc(projectsCol, id);
    const projectSnapshot = await getDoc(projectRef);

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
