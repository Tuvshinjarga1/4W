
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpjHnNl14UqEcjjboE5yuJV9GAx1b3o6U",
  authDomain: "hackaton-gdg.firebaseapp.com",
  projectId: "hackaton-gdg",
  storageBucket: "hackaton-gdg.firebasestorage.app",
  messagingSenderId: "604893337422",
  appId: "1:604893337422:web:8846954ba358042b56f01f",
  measurementId: "G-E68DWBRC1Q",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  userType: "giver" | "receiver";
  createdAt: Date;
  updatedAt: Date;
}

export const createUserProfile = async (
  uid: string,
  email: string,
  displayName: string,
  userType: "giver" | "receiver"
): Promise<void> => {
  const userRef = doc(db, "users", uid);
  const userProfile: UserProfile = {
    uid,
    email,
    displayName,
    userType,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await setDoc(userRef, userProfile);
};

export const getUserProfile = async (
  uid: string
): Promise<UserProfile | null> => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();
    return {
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    } as UserProfile;
  }

  return null;
};

export default app;
