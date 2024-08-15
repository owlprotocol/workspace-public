import { inMemoryPersistence, Auth } from "firebase/auth";

/**
 * signOutAndClearAuth removes auth persistence from the browser and then signs the user out.
 * inMemoryPersistence prevents the auth from persisting after reloading the page.
 */
export const signOutAndClearAuth = (firebaseAuth: Auth) =>
    firebaseAuth.setPersistence(inMemoryPersistence).then(() => firebaseAuth.signOut());
