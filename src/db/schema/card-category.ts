import { relations } from "drizzle-orm";
import { pgTable, uuid, primaryKey } from "drizzle-orm/pg-core";
import { card } from "./card";
import { category } from "./category";

export const cardToCategory = pgTable(
  "card_to_category",
  {
    cardId: uuid("card_id")
      .notNull()
      .references(() => card.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => category.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.cardId, table.categoryId] })],
);

export const cardToCategoryRelations = relations(cardToCategory, ({ one }) => ({
  card: one(card, {
    fields: [cardToCategory.cardId],
    references: [card.id],
  }),
  category: one(category, {
    fields: [cardToCategory.categoryId],
    references: [category.id],
  }),
}));
