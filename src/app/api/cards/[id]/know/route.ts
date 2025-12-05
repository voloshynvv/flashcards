import { db } from "@/db";
import { card } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export const POST = async (
  request: Request,
  ctx: RouteContext<"/api/cards/[id]">,
) => {
  const { id } = await ctx.params;

  try {
    const [data] = await db.select().from(card).where(eq(card.id, id));

    if (data.knownCount === 5) {
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
