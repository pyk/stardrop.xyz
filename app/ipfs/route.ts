import { NextRequest, NextResponse } from "next/server";
import { Session } from "@/lib/session";

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Make sure user is signed in
  const session = await Session.fromRequest(req);
  if (session.address == null) {
    return NextResponse.json({ message: "Access denied" }, { status: 403 });
  }

  return NextResponse.json({ message: "ok" });
}
