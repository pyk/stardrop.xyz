import { Session } from "@/lib/session";
import { getSignatures } from "@/lib/smart-contract";
import { NextRequest, NextResponse } from "next/server";
import { isAddress } from "viem";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const network = searchParams.get("network");
  const address = searchParams.get("address");

  if (network == null || address == null) {
    return NextResponse.json(
      { message: "Bad Request: Network and Address not defined" },
      { status: 400 }
    );
  }

  if (!isAddress(address)) {
    return NextResponse.json(
      { message: "Bad Request: Invalid address" },
      { status: 400 }
    );
  }

  // If user is not signed then return bad request
  const session = await Session.fromRequest(req);
  if (session.address == null) {
    return NextResponse.json(
      { message: "Bad Request", code: "STS82" },
      { status: 400 }
    );
  }

  if (network == "ethereum") {
    const signatures = await getSignatures(network, address);
    return NextResponse.json(
      { address: address, signatures },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { message: "Bad Request: Unsupported network", code: "STS82" },
    { status: 400 }
  );
}
