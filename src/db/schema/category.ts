import { relations } from "drizzle-orm";
import { unique, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { cardToCategory } from "./card-category";
import { user } from "./auth";

export const category = pgTable(
  "category",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
  },
  (table) => [unique("category_user_unique").on(table.userId, table.name)],
);

export const categoryRelations = relations(category, ({ many, one }) => ({
  cardToCategory: many(cardToCategory),
  user: one(user, {
    fields: [category.userId],
    references: [user.id],
  }),
}));
