import LoadingSpinner from "./loading-spinner";

export default function LoadingOverlay({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white/90 dark:bg-slate-800/90 rounded-lg px-6 py-4 flex items-center gap-4 shadow-lg">
        <LoadingSpinner className="size-10 text-primary" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}
