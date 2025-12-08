import { db } from "@/db";
import { card, cardToCategory, category } from "@/db/schema";
import { data } from "./data.json";
import { getCurrentUser } from "@/lib/session";

export const GET = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("🌱 Starting seed...");

    const uniqueCategories = [...new Set(data.map((c) => c.category))].map(
      (name) => ({ name }),
    );

    await db.insert(category).values(uniqueCategories).returning();

    const allCategories = await db.select().from(category);
    const categoryMap = Object.fromEntries(
      allCategories.map((c) => [c.name, c.id]),
    );

    const insertedCards = await db
      .insert(card)
      .values(
        data.map((c, i) => ({
          question: c.question,
          answer: c.answer,
          knownCount: c.knownCount || 0,
          createdAt: new Date(Date.now() - i * 60 * 1000 * 5),
          userId: currentUser.id,
        })),
      )
      .returning();

    const cardCategoryRelations = insertedCards.map((c, idx) => ({
      cardId: c.id,
      categoryId: categoryMap[data[idx].category],
    }));

    await db.insert(cardToCategory).values(cardCategoryRelations);

    return Response.json({ message: "success" });
  } catch (e) {
    return Response.json({ ok: false, error: e }, { status: 500 });
  }
};
