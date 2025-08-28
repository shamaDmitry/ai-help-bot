import React from "react";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "./loading-spinner";

type Props = React.ComponentProps<typeof Button> & {
  isLoading?: boolean;
  loadingLabel?: string;
};

export default function LoadingButton({
  isLoading = false,
  loadingLabel = "Loading",
  children,
  className = "",
  ...props
}: Props) {
  return (
    <Button
      className={`flex items-center justify-center ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className={`flex items-center gap-2`}>
          <LoadingSpinner className="size-4" />
          {loadingLabel}
        </span>
      ) : (
        <span className={`flex items-center gap-2 `}>{children}</span>
      )}
    </Button>
  );
}
