import { useMutation, useQueryClient } from "@tanstack/react-query";

export const resetProgress = async (id: string) => {
  const response = await fetch(`/api/cards/${id}/reset-progress`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`failed to reset progress for card with id ${id}`);
  }

  return response;
};

export const useResetProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetProgress,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cards"],
        refetchType: "all",
      });
    },
  });
};
