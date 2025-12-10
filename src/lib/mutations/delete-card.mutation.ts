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

interface UseDeleteCardArgs {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useDeleteCard = ({
  onSuccess,
  onError,
}: UseDeleteCardArgs = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCard,
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
    onError,
  });
};
