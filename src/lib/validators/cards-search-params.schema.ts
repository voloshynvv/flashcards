import { z } from "zod";

export const cardsSearchParams = z.object({
  hideMastered: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .catch(false),
  categoryIds: z
    .string()
    .transform((value) => {
      return value?.split(",") || [];
    })
    .pipe(z.array(z.uuid()))
    .catch([]),
});

export type CardsFilters = z.infer<typeof cardsSearchParams>;
