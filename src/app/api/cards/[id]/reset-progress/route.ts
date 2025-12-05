import { db } from "@/db";
import { card } from "@/db/schema";
import { eq } from "drizzle-orm";

export const POST = async (
  request: Request,
  ctx: RouteContext<"/api/cards/[id]">,
) => {
  const { id } = await ctx.params;

  try {
    await db
      .update(card)
      .set({
        knownCount: 0,
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
