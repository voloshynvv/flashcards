import { db } from "@/db";
import { card } from "@/db/schema";
import { count, eq, sql } from "drizzle-orm";
import { getCurrentUser } from "@/lib/session";

export const GET = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [result] = await db
      .select({
        totalCards: count(card.id),
        mastered: sql<number>`SUM(CASE WHEN ${card.knownCount} = 5 THEN 1 ELSE 0 END)`,
        inProgress: sql<number>`SUM(CASE WHEN ${card.knownCount} > 0 AND ${card.knownCount} < 5 THEN 1 ELSE 0 END)`,
        notStarted: sql<number>`SUM(CASE WHEN ${card.knownCount} = 0 THEN 1 ELSE 0 END)`,
      })
      .from(card)
      .where(eq(card.userId, currentUser.id));

    return Response.json({
      totalCards: result.totalCards,
      mastered: result.mastered ?? 0,
      inProgress: result.inProgress ?? 0,
      notStarted: result.notStarted ?? 0,
    });
  } catch {
    return Response.json(
      { error: "Failed to get a study stats" },
      { status: 500 },
    );
  }
};
