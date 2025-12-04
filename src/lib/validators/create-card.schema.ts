import { z } from "zod";

export const createCardSchema = z.object({
  question: z.string().min(1, { error: "Question is required." }),
  answer: z.string().min(1, { error: "Answer is required." }),
  category: z.string().min(1, { error: "Category is required." }),
});

export type CreateCard = z.infer<typeof createCardSchema>;
