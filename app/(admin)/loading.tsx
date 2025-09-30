import LoadingSpinner from "@/components/ui/loading-spinner";

const Loading = () => {
  return (
    <div className="size-full rounded-xl border p-5 flex items-center justify-center">
      <LoadingSpinner className="size-12 text-primary" />
    </div>
  );
};

export default Loading;
