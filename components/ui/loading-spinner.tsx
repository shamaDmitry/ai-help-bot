import { LoaderPinwheel } from "lucide-react";

export default function LoadingSpinner({
  className = "size-8",
}: {
  className?: string;
}) {
  return <LoaderPinwheel className={`animate-spin ${className}`} />;
}
