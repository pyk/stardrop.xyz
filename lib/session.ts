import { sealData, unsealData } from "iron-session";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "stardrop-siwe";

if (!process.env.SIWE_SESSION_SECRET) {
  throw new Error("SIWE_SESSION_SECRET cannot be empty.");
}

const SESSION_OPTIONS = {
  ttl: 60 * 60 * 24 * 30, // 30 days
  password: process.env.SIWE_SESSION_SECRET!,
};

export type ISession = {
  nonce?: string;
  chainId?: number;
  address?: string;
};

export class Session {
  nonce?: string;
  chainId?: number;
  address?: string;

  constructor(session?: ISession) {
    this.nonce = session?.nonce;
    this.chainId = session?.chainId;
    this.address = session?.address;
  }

  static async fromCookies(cookies: RequestCookies): Promise<Session> {
    const sessionCookie = cookies.get(COOKIE_NAME)?.value;

    if (!sessionCookie) return new Session();
    return new Session(
      await unsealData<ISession>(sessionCookie, SESSION_OPTIONS)
    );
  }

  static async fromRequest(req: NextRequest): Promise<Session> {
    return this.fromCookies(req.cookies);
  }

  clear(res: NextResponse): Promise<void> {
    this.nonce = undefined;
    this.chainId = undefined;
    this.address = undefined;

    return this.persist(res);
  }

  toJSON(): ISession {
    return { nonce: this.nonce, address: this.address, chainId: this.chainId };
  }

  async persist(res: NextResponse): Promise<void> {
    res.cookies.set(
      COOKIE_NAME,
      await sealData(this.toJSON(), SESSION_OPTIONS),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      }
    );
  }
}
