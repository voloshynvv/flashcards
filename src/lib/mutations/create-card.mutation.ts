import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cardsInfiniteQueryOptions } from "../queries/cards.query";
import { categoriesQueryOptions } from "../queries/categories.query";
import { CreateCard } from "../validators/create-card.schema";

export const createCard = async (data: CreateCard) => {
  const response = await fetch(`http://localhost:3000/api/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("failed to create a new card");
  }

  return await response.json();
};

export const useCreateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCard,
    onSuccess: async () => {
      await queryClient.invalidateQueries(cardsInfiniteQueryOptions());
      await queryClient.invalidateQueries(categoriesQueryOptions());
    },
  });
};
