import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesQueryOptions } from "../queries/categories.query";

export const deleteCard = async (id: string) => {
  const response = await fetch(`/api/cards/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("failed to delete card");
  }

  return null;
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCard,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cards"],
        refetchType: "all",
      });
      await queryClient.invalidateQueries(categoriesQueryOptions());
    },
  });
};
