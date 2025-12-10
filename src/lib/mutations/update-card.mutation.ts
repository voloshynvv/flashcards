import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesQueryOptions } from "../queries/categories.query";
import { UpdateCard } from "../validators/card.schema";

export const updateCard = async (id: string, data: UpdateCard) => {
  const response = await fetch(`/api/cards/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("failed to update card");
  }

  return null;
};

interface UseUpdateCardArgs {
  onSuccess?: () => void;
}

export const useUpdateCard = ({ onSuccess }: UseUpdateCardArgs) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCard }) =>
      updateCard(id, data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["cards"],
          refetchType: "all",
        }),
        queryClient.invalidateQueries(categoriesQueryOptions()),
      ]);

      onSuccess?.();
    },
  });
};
