import { and, desc, eq, inArray, ne, sql, SQL } from "drizzle-orm";
import { db } from "@/db";
import z from "zod";
import { card, cardToCategory, category } from "@/db/schema";
import { cardsSearchParamsWithPage } from "@/lib/validators/cards-search-params.schema";
import { NextRequest } from "next/server";
import { createCardSchema } from "@/lib/validators/create-card.schema";
import { getCurrentUser } from "@/lib/session";

const PAGE_SIZE = 12;

export const GET = async (request: NextRequest) => {
  const searchParams = Object.fromEntries(request.nextUrl.searchParams);
  const { categoryIds, hideMastered, page } =
    cardsSearchParamsWithPage.parse(searchParams);

  const filters: SQL[] = [];

  if (categoryIds.length > 0) {
    filters.push(inArray(cardToCategory.categoryId, categoryIds));
  }

  if (hideMastered) {
    filters.push(ne(card.knownCount, 5));
  }

  const offset = page * PAGE_SIZE;

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db
      .select({
        card: card,
        category: category.name,
      })
      .from(card)
      .innerJoin(cardToCategory, eq(card.id, cardToCategory.cardId))
      .innerJoin(category, eq(category.id, cardToCategory.categoryId))
      .where(and(...filters, eq(card.userId, currentUser.id)))
      .limit(PAGE_SIZE)
      .offset(offset)
      .orderBy(desc(card.createdAt));

    const totalCountResult = await db
      .select({
        count: sql<number>`count(*)`.mapWith(Number),
      })
      .from(card)
      .innerJoin(cardToCategory, eq(card.id, cardToCategory.cardId))
      .innerJoin(category, eq(category.id, cardToCategory.categoryId))
      .where(and(...filters, eq(card.userId, currentUser.id)));

    const totalItems = totalCountResult[0].count;
    const totalPages = Math.ceil(totalItems / PAGE_SIZE) - 1;

    const flattenedResult = result.map((item) => ({
      ...item.card,
      category: item.category,
    }));

    return Response.json({
      cards: flattenedResult,
      totalPages,
      totalItems,
      itemsPerPage: PAGE_SIZE,
    });
  } catch {
    return Response.json({ error: "Failed to fetch cards" }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const validatedBody = createCardSchema.safeParse(body);

  if (!validatedBody.success) {
    return Response.json(
      {
        error: "Validation error",
        details: z.flattenError(validatedBody.error).fieldErrors,
      },
      { status: 400 },
    );
  }

  const { data } = validatedBody;

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db.transaction(async (tx) => {
      const [newCard] = await tx
        .insert(card)
        .values({
          answer: data.answer,
          question: data.question,
          userId: currentUser.id,
        })
        .returning({ id: card.id });

      const existingCategory = await tx.query.category.findFirst({
        columns: { id: true },
        where: (category, { eq, and }) =>
          and(
            eq(category.name, data.category),
            eq(category.userId, currentUser.id),
          ),
      });

      let categoryId: string;

      if (existingCategory) {
        categoryId = existingCategory.id;
      } else {
        const [newCategory] = await tx
          .insert(category)
          .values({ name: data.category, userId: currentUser.id })
          .returning({ id: category.id });

        categoryId = newCategory.id;
      }

      await tx.insert(cardToCategory).values({
        categoryId,
        cardId: newCard.id,
      });
    });

    return Response.json({
      message: "Card created successfully",
    });
  } catch (e) {
    console.log(e);
    return Response.json(
      { error: "Failed to create a new card" },
      { status: 500 },
    );
  }
};
