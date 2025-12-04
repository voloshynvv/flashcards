import { infiniteQueryOptions, keepPreviousData } from "@tanstack/react-query";
import {
  CardsFilters,
  CardsFiltersWithPage,
} from "../validators/cards-search-params.schema";

export interface Card {
  id: string;
  question: string;
  answer: string;
  knownCount: boolean;
  category: string;
}

export const getCards = async (filters: Partial<CardsFiltersWithPage> = {}) => {
  const params = new URLSearchParams();

  if (filters.categoryIds && filters.categoryIds.length > 0) {
    params.set("categoryIds", filters.categoryIds.join(","));
  }
  if (filters.hideMastered) {
    params.set("hideMastered", filters.hideMastered.toString());
  }
  if (filters.page) {
    params.set("page", filters.page.toString());
  }

  const response = await fetch(`http://localhost:3000/api/cards?${params}`);

  if (!response.ok) {
    throw new Error("failed to get cards");
  }

  const data = (await response.json()) as { cards: Card[]; totalPages: number };
  return data;
};

export const cardsInfiniteQueryOptions = (
  filters: Partial<CardsFilters> = {},
) => {
  return infiniteQueryOptions({
    queryKey: ["cards", filters],
    queryFn: ({ pageParam }) => getCards({ page: pageParam, ...filters }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.totalPages <= lastPageParam) {
        return undefined;
      }

      return lastPageParam + 1;
    },
    placeholderData: keepPreviousData,
  });
};
