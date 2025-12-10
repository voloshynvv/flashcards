import { z } from "zod";
import { db } from "@/db";
import { card, cardToCategory, category } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { updateCardSchema } from "@/lib/validators/card.schema";
import { and, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const PATCH = async (
  request: NextRequest,
  ctx: RouteContext<"/api/cards/[id]">,
) => {
  const body = await request.json();
  const validatedBody = updateCardSchema.safeParse(body);
  const { id: cardId } = await ctx.params;

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

    const [existingCard] = await db
      .select()
      .from(card)
      .where(eq(card.id, cardId));

    if (!existingCard || currentUser.id !== existingCard.userId) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.transaction(async (tx) => {
      await tx
        .update(card)
        .set({
          answer: data.answer,
          question: data.question,
        })
        .where(eq(card.id, cardId))
        .returning();

      if (!data.category) return;

      const [categoryRecord] = await tx
        .select()
        .from(category)
        .where(
          and(
            eq(category.name, data.category),
            eq(category.userId, currentUser.id),
          ),
        );

      let newCategoryId: string;

      if (categoryRecord) {
        newCategoryId = categoryRecord.id;
      } else {
        const [createdCategory] = await tx
          .insert(category)
          .values({ name: data.category, userId: currentUser.id })
          .returning();

        newCategoryId = createdCategory.id;
      }

      const [existingRelation] = await tx
        .select()
        .from(cardToCategory)
        .where(eq(cardToCategory.cardId, cardId));

      if (!existingRelation) {
        await tx.insert(cardToCategory).values({
          cardId,
          categoryId: newCategoryId,
        });
      } else if (existingRelation.categoryId !== newCategoryId) {
        await tx
          .update(cardToCategory)
          .set({ categoryId: newCategoryId })
          .where(eq(cardToCategory.cardId, cardId));
      }
    });

    return new Response(null, {
      status: 204,
    });
  } catch (e) {
    console.log(e);
    return Response.json({ error: "Failed to update card" }, { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  ctx: RouteContext<"/api/cards/[id]">,
) => {
  const { id } = await ctx.params;

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db
      .delete(card)
      .where(and(eq(card.id, id), eq(card.userId, currentUser.id)));

    return Response.json(
      { message: "Card deleted successfully" },
      {
        status: 200,
      },
    );
  } catch {
    return Response.json({ error: "Failed to delete card" }, { status: 500 });
  }
};
