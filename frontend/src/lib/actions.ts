import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";

export function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export async function getPreferences() {
  const user = await getCurrentUser();

  if (!user) {
    console.error("No user is signed in.");
    return;
  }
  console.log("User ID: ", user.uid);

  const q = query(collection(db, "accounts"), where("user_id", "==", user.uid));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("No matching documents.");
    return;
  }

  const accDoc = querySnapshot.docs[0];
  return accDoc?.data();
}

export async function addAccount({ loc, lang }: { loc: string; lang: string }) {
  const user = await getCurrentUser();

  if (!user) {
    console.error("No user is signed in.");
    return;
  }

  const updatedData = {
    user_id: user.uid,
    language: lang,
    location: loc,
    history: [],
    genre: [],
    cast: [],
    mood: [],
  };

  const q = query(collection(db, "accounts"), where("user_id", "==", user.uid));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    try {
      const docRef = await addDoc(collection(db, "accounts"), updatedData);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    return;
  }

  const accDoc = querySnapshot.docs[0];
  const docRef = accDoc?.ref;

  if (!docRef) {
    console.error("No document reference found.");
    return;
  }
  await updateDoc(docRef, updatedData);

  console.log("Document updated with ID: ", docRef.id);
}
