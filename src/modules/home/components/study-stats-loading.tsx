import { Skeleton } from "@/components/ui/skeleton";

export const StudyStatsLoading = () => {
  return (
    <div className="flex h-fit flex-col gap-4 rounded-2xl bg-neutral-50 px-4 py-5 lg:p-6">
      <Skeleton className="h-8 w-full" />

      <div className="flex flex-col gap-4 md:gap-5">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    </div>
  );
};
