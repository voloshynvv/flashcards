import { NextRequest } from "next/server";
import { count, desc, eq, ilike } from "drizzle-orm";
import { db } from "@/db";
import { cardToCategory, category } from "@/db/schema";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name");

  try {
    const result = await db
      .select({
        id: category.id,
        name: category.name,
        count: count(cardToCategory.cardId),
      })
      .from(category)
      .innerJoin(cardToCategory, eq(cardToCategory.categoryId, category.id))
      .where(name ? ilike(category.name, `%${name}%`) : undefined)
      .groupBy(category.id, category.name)
      .limit(10)
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
