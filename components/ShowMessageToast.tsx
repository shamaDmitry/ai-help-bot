"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function ShowMessageToast() {
  const searchParams = useSearchParams();
  useEffect(() => {
    const message = searchParams.get("message");

    if (!message) return;

    if (message === "login") {
      toast("Please log in to continue", {
        description: "You must be signed in",
      });
    } else {
      toast(message);
    }
  }, [searchParams]);

  return null;
}
