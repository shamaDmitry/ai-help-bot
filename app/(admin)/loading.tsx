import LoadingSpinner from "@/components/ui/loading-spinner";

const Loading = () => {
  return (
    <div className="size-full bg-muted p-5 flex items-center justify-center">
      <LoadingSpinner className="size-12 text-muted-foreground" />
    </div>
  );
};

export default Loading;
