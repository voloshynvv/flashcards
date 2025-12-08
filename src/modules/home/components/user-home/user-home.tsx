import { QueryClient } from "@tanstack/react-query";
import { cardsInfiniteQueryOptions } from "@/lib/queries/cards.query";
import { statisticsQueryOptions } from "@/lib/queries/statistics.query";

import { UserHomeClient } from "./user-home-client";

export const UserHome = () => {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery(statisticsQueryOptions());
  queryClient.prefetchInfiniteQuery(cardsInfiniteQueryOptions());

  return <UserHomeClient />;
};
