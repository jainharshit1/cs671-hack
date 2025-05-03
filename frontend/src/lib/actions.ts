import { addDoc, collection } from "firebase/firestore";
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

export async function addTest() {
  const user = await getCurrentUser();

  if (!user) {
    console.error("No user is signed in.");
    return;
  }
  console.log("User ID: ", user.uid);

  try {
    const docRef = await addDoc(collection(db, "accounts"), {
      uid: user.uid,
      language: "EN-US",
      location: "India",
      history: [],
      genre: [],
      cast: [],
      mood: [],
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
