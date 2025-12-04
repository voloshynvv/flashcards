import { queryOptions } from "@tanstack/react-query";

interface GetStatisticsResponse {
  totalCards: number;
  mastered: number;
  inProgress: number;
  notStarted: number;
}

export const getStatistics = async () => {
  const response = await fetch(`http://localhost:3000/api/cards/statistics`);

  if (!response.ok) {
    throw new Error("failed to get stats");
  }

  const data = (await response.json()) as GetStatisticsResponse;
  return data;
};

export const statisticsQueryOptions = () =>
  queryOptions({
    queryKey: ["cards", "statistics"],
    queryFn: getStatistics,
  });
