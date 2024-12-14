import { ArrowRotateLeft, Information } from "iconsax-react";

export function RetryFetch({
  refetch,
  error,
}: {
  refetch: () => void;
  error?: string;
}) {
  const handleRetry = () => {
    if (refetch) {
      refetch();
    }
  };
  return (
    <>
      <div className="flex w-full flex-wrap justify-center py-5 ">
        <div className="flex w-full max-w-[400px] flex-col items-center gap-4 rounded-lg bg-neutral-200/70 dark:bg-neutral-800 border dark:border-neutral-700 p-4 py-10">
          <Information size="48" />
          <h2 className="text-center">{error || "Something went wrong!"}</h2>

          <button
            onClick={handleRetry}
            type="button"
            className={`flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm text-white transition-all duration-300 `}
          >
            <ArrowRotateLeft size="20" />

            <p className={`font-medium `}>Retry</p>
          </button>
        </div>
      </div>
    </>
  );
}
