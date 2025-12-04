import { queryOptions } from "@tanstack/react-query";

export interface Card {
  id: string;
  question: string;
  answer: string;
  knownCount: boolean;
  category: string;
}

export interface CardsFilters {
  categoryIds?: string[];
  hideMastered?: boolean;
  page?: number;
}

export const getCards = async (filters: CardsFilters = {}) => {
  const params = new URLSearchParams();

  if (filters.categoryIds && filters.categoryIds.length > 0) {
    params.set("categoryIds", filters.categoryIds.join(","));
  }

  if (filters.hideMastered) {
    params.set("hideMastered", filters.hideMastered.toString());
  }

  const response = await fetch(`http://localhost:3000/api/cards?${params}`);

  if (!response.ok) {
    throw new Error("failed to get cards");
  }

  const data = (await response.json()) as { cards: Card[] };
  return data.cards;
};

export const cardsQueryOptions = (filters: CardsFilters = {}) => {
  return queryOptions({
    queryKey: ["cards", { filters }],
    queryFn: () => getCards(filters),
  });
};
