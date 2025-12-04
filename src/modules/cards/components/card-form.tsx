"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, CirclePlus } from "lucide-react";
import { useCreateCard } from "@/lib/mutations/create-card.mutation";

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
}

export const CardForm = ({ initialValues }: CreateCardFormProps) => {
  const form = useForm({
    defaultValues: {
      question: initialValues?.question ?? "",
      answer: initialValues?.answer ?? "",
      category: initialValues?.category ?? "",
    },
    resolver: zodResolver(formSchema),
  });

  const createCardMutation = useCreateCard();

  const {
    formState: { errors },
  } = form;

  const onSubmit = form.handleSubmit(async (data) => {
    createCardMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  });

  const hasError = createCardMutation.isError;

  return (
    <form
      className="shadow-border-lg rounded-2xl border bg-neutral-50 p-5 md:p-6 lg:p-8"
      onSubmit={onSubmit}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <FormField
            htmlFor="question"
            label="Question"
            invalid={Boolean(errors.question)}
            error={errors.question?.message}
          >
            <Input
              id="question"
              placeholder="e.g., What is the capital of France?"
              aria-invalid={Boolean(errors.question)}
              {...form.register("question")}
            />
          </FormField>

          <FormField
            htmlFor="answer"
            label="Answer"
            invalid={Boolean(errors.answer)}
            error={errors.answer?.message}
          >
            <Textarea
              id="answer"
              placeholder="e.g., Paris"
              aria-invalid={Boolean(errors.answer)}
              {...form.register("answer")}
            />
          </FormField>

          <FormField
            htmlFor="category"
            label="Category"
            invalid={Boolean(errors.category)}
            error={errors.category?.message}
          >
            <Input
              id="category"
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
            <Button type="submit">Update Card</Button>
          </div>
        ) : (
          <Button type="submit">
            <CirclePlus />
            Create Card
          </Button>
        )}
      </div>
    </form>
  );
};
