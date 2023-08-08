import { Session } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { SiweErrorType, SiweMessage, generateNonce } from "siwe";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const session = await Session.fromRequest(req);
  return NextResponse.json(session.toJSON());
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const session = await Session.fromRequest(req);
  if (!session?.nonce) session.nonce = generateNonce();
  const resp = new NextResponse(session.nonce);
  await session.persist(resp);
  return resp;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { message, signature } = await req.json();
  const session = await Session.fromRequest(req);

  try {
    const siweMessage = new SiweMessage(message);
    const { data: fields } = await siweMessage.verify({
      signature,
      nonce: session.nonce,
    });

    if (fields.nonce !== session.nonce) {
      const resp = new NextResponse("Invalid nonce.", { status: 422 });
      await session.clear(resp);
      return resp;
    }

    session.address = fields.address;
    session.chainId = fields.chainId;
  } catch (error) {
    switch (error) {
      case SiweErrorType.INVALID_NONCE:
      case SiweErrorType.INVALID_SIGNATURE:
        const invalidSigResp = new NextResponse(String(error), {
          status: 422,
        });
        await session.clear(invalidSigResp);
        return invalidSigResp;

      default:
        const errorResp = new NextResponse(String(error), { status: 400 });
        await session.clear(errorResp);
        return errorResp;
    }
  }

  const validResp = new NextResponse("");
  await session.persist(validResp);
  return validResp;
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const session = await Session.fromRequest(req);
  const res = new NextResponse("");
  await session.clear(res);
  return res;
}
