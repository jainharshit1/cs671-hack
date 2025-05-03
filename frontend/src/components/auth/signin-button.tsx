"use client";

import { signInWithGoogle } from "@/lib/auth";

export default function SignInButton() {
  const handleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Signed in user:", user);
    } catch (err) {
      alert("Failed to sign in. Check console for details.");
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="rounded bg-blue-600 px-4 py-2 text-white"
    >
      Sign in with Google
    </button>
  );
}
