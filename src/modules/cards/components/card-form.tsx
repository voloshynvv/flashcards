"use client";

import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, CirclePlus } from "lucide-react";
import { CreateCard, createCardSchema } from "@/lib/validators/card.schema";

import { Button } from "@/components/ui/button/button";
import { FormField } from "@/components/ui/form/form-field";
import { Input } from "@/components/ui/form/input";
import { Textarea } from "@/components/ui/form/textarea";

interface CreateCardFormProps {
  initialValues?: CreateCard;
  hasError?: boolean;
  onSubmit: (data: CreateCard, reset: () => void) => void;
  isLoading?: boolean;
}

export const CardForm = ({
  initialValues,
  hasError,
  onSubmit,
  isLoading,
}: CreateCardFormProps) => {
  const id = useId();

  const form = useForm({
    values: {
      question: initialValues?.question ?? "",
      answer: initialValues?.answer ?? "",
      category: initialValues?.category ?? "",
    },
    resolver: zodResolver(createCardSchema),
  });

  const {
    formState: { errors },
  } = form;

  const isCreateMode = Boolean(initialValues);

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit(data, () => form.reset());
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <FormField
            htmlFor={`question-${id}`}
            label="Question"
            invalid={Boolean(errors.question)}
            error={errors.question?.message}
          >
            <Input
              id={`question-${id}`}
              placeholder="e.g., What is the capital of France?"
              aria-invalid={Boolean(errors.question)}
              {...form.register("question")}
            />
          </FormField>

          <FormField
            htmlFor={`answer-${id}`}
            label="Answer"
            invalid={Boolean(errors.answer)}
            error={errors.answer?.message}
          >
            <Textarea
              id={`answer-${id}`}
              placeholder="e.g., Paris"
              aria-invalid={Boolean(errors.answer)}
              {...form.register("answer")}
            />
          </FormField>

          <FormField
            htmlFor={`category-${id}`}
            label="Category"
            invalid={Boolean(errors.category)}
            error={errors.category?.message}
          >
            <Input
              id={`category-${id}`}
              placeholder="e.g., Geography"
              aria-invalid={Boolean(errors.category)}
              {...form.register("category")}
            />
          </FormField>
        </div>

        {hasError && (
          <div className="flex items-center gap-2 rounded-md border border-pink-700 p-4 font-normal text-pink-700">
            <AlertCircleIcon className="size-4" />
            <p>Something went wrong. Please, try again later.</p>
          </div>
        )}

        {isCreateMode ? (
          <Button type="submit" disabled={isLoading}>
            <CirclePlus />
            Create Card
          </Button>
        ) : (
          <div className="justify-self-end">
            <Button type="submit" disabled={isLoading}>
              Update Card
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};
