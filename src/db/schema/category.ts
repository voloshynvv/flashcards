import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { cardToCategory } from "./card-category";

export const category = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull().unique(),
});

export const categoryRelations = relations(category, ({ many }) => ({
  cardToCategory: many(cardToCategory),
}));
