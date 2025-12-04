"use client";

import { useId } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, CirclePlus } from "lucide-react";
import { useCreateCard } from "@/lib/mutations/create-card.mutation";
import { useUpdateCard } from "@/lib/mutations/update-card.mutation";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const formSchema = z.object({
  question: z.string().min(1, { error: "Please enter a question." }),
  answer: z.string().min(1, { error: "Please enter an answer" }),
  category: z.string().min(1, { error: "Please enter a category." }),
});

interface CreateCardFormProps {
  initialValues?: z.infer<typeof formSchema> & { id: string };
  onSubmit?: () => void;
}

export const CardForm = ({ initialValues, onSubmit }: CreateCardFormProps) => {
  const id = useId();

  const form = useForm({
    defaultValues: {
      question: initialValues?.question ?? "",
      answer: initialValues?.answer ?? "",
      category: initialValues?.category ?? "",
    },
    resolver: zodResolver(formSchema),
  });

  const createCardMutation = useCreateCard();
  const updateCardMutation = useUpdateCard();

  const {
    formState: { errors },
  } = form;

  const handleSubmit = form.handleSubmit(async (data) => {
    if (initialValues) {
      updateCardMutation.mutate(
        { id: initialValues.id, data },
        {
          onSuccess: () => {},
          onSettled: () => {
            form.reset();
            onSubmit?.();
          },
        },
      );
    } else {
      createCardMutation.mutate(data, {
        onSuccess: () => {},
        onSettled: () => {
          form.reset();
          onSubmit?.();
        },
      });
    }
  });

  const hasError = createCardMutation.isError;

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

        {initialValues ? (
          <div className="justify-self-end">
            <Button type="submit" disabled={updateCardMutation.isPending}>
              Update Card
            </Button>
          </div>
        ) : (
          <Button disabled={createCardMutation.isPending} type="submit">
            <CirclePlus />
            Create Card
          </Button>
        )}
      </div>
    </form>
  );
};
