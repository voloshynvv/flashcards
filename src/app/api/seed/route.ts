import { db } from "@/db";
import { card, cardToCategory, category } from "@/db/schema";
import { data } from "./data.json";
import { getCurrentUser } from "@/lib/session";
import { eq } from "drizzle-orm";

export const GET = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("🌱 Starting seed...");

    // 1️⃣ Clean up existing data for this user
    await db.transaction(async (tx) => {
      // Delete user's cards (will cascade to cardToCategory)
      await tx.delete(card).where(eq(card.userId, currentUser.id));

      // Delete user's categories
      await tx.delete(category).where(eq(category.userId, currentUser.id));
    });

    // 2️⃣ Insert unique categories
    const uniqueCategories = [...new Set(data.map((c) => c.category))].map(
      (name) => ({ name, userId: currentUser.id }),
    );

    await db.insert(category).values(uniqueCategories).returning();

    // 3️⃣ Fetch all categories to build a map
    const allCategories = await db
      .select()
      .from(category)
      .where(eq(category.userId, currentUser.id));

    const categoryMap = Object.fromEntries(
      allCategories.map((c) => [c.name, c.id]),
    );

    // 4️⃣ Insert cards for the user
    const insertedCards = await db
      .insert(card)
      .values(
        data.map((c, i) => ({
          question: c.question,
          answer: c.answer,
          knownCount: c.knownCount || 0,
          createdAt: new Date(Date.now() - i * 5 * 60 * 1000),
          userId: currentUser.id,
        })),
      )
      .returning();

    // 5️⃣ Insert card-to-category relations
    const cardCategoryRelations = insertedCards.map((c, idx) => ({
      cardId: c.id,
      categoryId: categoryMap[data[idx].category],
    }));

    await db.insert(cardToCategory).values(cardCategoryRelations);

    return Response.json({ message: "Seed completed successfully" });
  } catch {
    return Response.json({ message: "something went wrong" }, { status: 500 });
  }
};
