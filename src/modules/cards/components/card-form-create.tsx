"use client";

import { useCreateCard } from "@/lib/mutations/create-card.mutation";
import { CreateCard } from "@/lib/validators/card.schema";
import { createToast } from "@/components/ui/feedback/toast";

import { CardForm } from "./card-form";

export const CardFormCreate = () => {
  const createCard = useCreateCard();

  const handleSubmit = async (data: CreateCard, reset: () => void) => {
    createCard.mutate(data, {
      onSuccess: () => {
        createToast("Card created successfully.");
        reset();
      },
    });
  };

  return (
    <CardForm
      hasError={createCard.isError}
      onSubmit={handleSubmit}
      isLoading={createCard.isPending}
    />
  );
};
