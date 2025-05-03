"use client";

import React from "react";
import { addTest } from "@/lib/actions";
import OnboardingHeader from "@/components/auth/onboarding-header";

const OnboardingPage = () => {
  return (
    <div>
      <OnboardingHeader />
      <div className="cursor-pointer bg-red-400 px-5 py-2" onClick={addTest}>
        click
      </div>
    </div>
  );
};

export default OnboardingPage;
