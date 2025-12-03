import { relations, sql } from "drizzle-orm";
import { pgTable, text, uuid, integer, check } from "drizzle-orm/pg-core";
import { cardToCategory } from "./card-category";

export const card = pgTable(
  "card",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    knownCount: integer("known_count").notNull().default(0),
  },
  (table) => [
    check(
      "known_count_range",
      sql`${table.knownCount} >= 0 AND ${table.knownCount} <=5`,
    ),
  ],
);

export const cardRelations = relations(card, ({ many }) => ({
  cardToCategory: many(cardToCategory),
}));
