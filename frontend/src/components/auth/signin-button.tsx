"use client";

import { signInWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function SignInButton() {
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Signed in user:", user);
      router.push("/onboarding");
    } catch (err) {
      alert("Failed to sign in. Check console for details.");
      console.error(err);
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
