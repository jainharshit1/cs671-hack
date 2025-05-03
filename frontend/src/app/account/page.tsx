"use client";

import React from "react";
import { useAuth } from "@/context/auth";
import { redirect } from "next/navigation";

const AccountPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    redirect("/");
    // TODO: Handle redirect to login page
  }

  return <div>{user.displayName}</div>;
};

export default AccountPage;
