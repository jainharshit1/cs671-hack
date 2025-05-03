"use client";

import React from "react";
import SignInButton from "@/components/auth/signin-button";
import { useAuth } from "@/context/auth";

const TestPage = () => {
  const { signOut, user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="pt-40">
      {user ? (
        <p>
          Welcome, {user.displayName}! Your UID is {user.uid}
          <button
            onClick={signOut}
            className="cursor-pointer rounded bg-red-500 px-4 py-2 text-white"
          >
            Sign Out
          </button>
        </p>
      ) : (
        <p>
          Please sign in.
          <SignInButton />
        </p>
      )}
    </div>
  );
};

export default TestPage;
