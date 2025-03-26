import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getClientIp } from "@/lib/utils";

const DAILY_LIMIT = 10;

export async function GET(req: NextRequest) {
  try {
    const clientIp = getClientIp(req) || "unknown";

    const usageCount = await getUserDailyUsage(clientIp);

    return NextResponse.json({
      remaining: Math.max(0, DAILY_LIMIT - usageCount),
      limit: DAILY_LIMIT,
      used: usageCount,
    });
  } catch (error: any) {
    console.error("Limit API error:", error);
    return NextResponse.json({ message: "An error occurred", error: error.message }, { status: 500 });
  }
}

async function getUserDailyUsage(clientIp: string): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = await db.query.chatQueries.findMany({
    where: (chat, { and, eq, gte }) => and(eq(chat.clientIp, clientIp), gte(chat.createdAt, today)),
  });

  return result.length;
}
