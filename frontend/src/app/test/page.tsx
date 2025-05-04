"use client";

import React, { useEffect, useState } from "react";
import SignInButton from "@/components/auth/signin-button";
import { useAuth } from "@/context/auth";

const TestPage = () => {
  const { signOut, user, loading } = useAuth();
  const [movies, setMovies] = useState<{} | null | undefined>({});

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:8000/movies/popular");
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="pt-40">
      {user ? (
        <div>
          Welcome, {user.displayName}! Your UID is {user.uid}
          <button
            onClick={signOut}
            className="cursor-pointer rounded bg-red-500 px-4 py-2 text-white"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          Please sign in.
          <SignInButton />
        </div>
      )}
      <div
        className="cursor-pointer bg-red-400 px-5 py-2"
        onClick={handleClick}
      >
        hello wotlrd
      </div>
    </div>
  );
};

export default TestPage;
