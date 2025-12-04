import { QueryClient } from "@tanstack/react-query";
import { FlashCards } from "./components/flash-cards";
import { StudyStats } from "./components/study-stats";
import { statisticsQueryOptions } from "@/lib/queries/statistics.query";

export const HomePage = () => {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery(statisticsQueryOptions());

  return (
    <main className="p-4 pb-10 md:p-8 md:pb-16">
      <div className="mx-auto flex max-w-310 flex-col gap-10 md:gap-12">
        <div className="grid gap-6 lg:grid-cols-[3fr_1.5fr] lg:gap-8">
          <div>
            <FlashCards />
          </div>
          <div>
            <StudyStats />
          </div>
        </div>
      </div>
    </main>
  );
};
