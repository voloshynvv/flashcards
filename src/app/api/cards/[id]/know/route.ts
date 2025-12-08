import { db } from "@/db";
import { card } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { eq, sql } from "drizzle-orm";

export const POST = async (
  request: Request,
  ctx: RouteContext<"/api/cards/[id]">,
) => {
  const { id } = await ctx.params;

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [existingCard] = await db.select().from(card).where(eq(card.id, id));

    if (!existingCard || currentUser.id !== existingCard.userId) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    if (existingCard.knownCount === 5) {
      return Response.json(
        { message: "You already mastered this card!" },
        {
          status: 400,
        },
      );
    }

    await db
      .update(card)
      .set({
        knownCount: sql`${card.knownCount} + 1`,
      })
      .where(eq(card.id, id));

    return Response.json(
      { message: "Progress reset successfully" },
      {
        status: 200,
      },
    );
  } catch {
    return Response.json(
      { error: "Failed to reset progress" },
      { status: 500 },
    );
  }
};
