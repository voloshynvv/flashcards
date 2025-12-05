import { useMutation, useQueryClient } from "@tanstack/react-query";

export const learnCard = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/cards/${id}/know`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`failed to learn card with id ${id}`);
  }

  return response;
};

export const useLearnCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: learnCard,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });
};
