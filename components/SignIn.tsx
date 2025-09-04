"use client";

import React from "react";
import { SignIn } from "@clerk/nextjs";

interface SignInProps {
  fallbackRedirectUrl?: string;
}

export default function SignInForm({ fallbackRedirectUrl = "/" }: SignInProps) {
  return (
    <div className="w-full">
      <SignIn routing="hash" fallbackRedirectUrl={fallbackRedirectUrl} />
    </div>
  );
}
