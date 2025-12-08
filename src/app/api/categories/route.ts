import { and, count, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { card, cardToCategory, category } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";

export const GET = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db
      .select({
        id: category.id,
        name: category.name,
        count: count(cardToCategory.cardId),
      })
      .from(category)
      .leftJoin(cardToCategory, eq(cardToCategory.categoryId, category.id))
      .leftJoin(
        card,
        and(
          eq(card.id, cardToCategory.cardId),
          eq(card.userId, currentUser.id),
        ),
      )
      .where(eq(category.userId, currentUser.id))
      .groupBy(category.id, category.name)
      .orderBy(desc(count(cardToCategory.cardId)));

    return Response.json({
      categories: result,
    });
  } catch {
    return Response.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
};
