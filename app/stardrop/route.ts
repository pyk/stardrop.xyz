import { NextRequest, NextResponse } from "next/server";
import { Session } from "@/lib/session";

if (!process.env.NFT_STORAGE_API_KEY) {
  throw new Error(`NFT_STORAGE_API_KEY is undefined`);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Make sure user is signed in
  const session = await Session.fromRequest(req);
  if (session.address == null) {
    return NextResponse.json({ message: "Access denied" }, { status: 403 });
  }

  // Extract form data
  // lets focus on uploading file to nft.storage first
  const formData = await req.formData();
  console.log("DEBUG: data", formData);
  const nftMedia: File | null = formData.get("nftMedia") as unknown as File;
  if (!nftMedia) {
    return NextResponse.json(
      { message: "NFT Media not found" },
      { status: 400 }
    );
  }

  // Upload to nft.storage
  const nftStorageData = new FormData();
  nftStorageData.set("file", nftMedia);
  const nftStorageRes = await fetch("https://api.nft.storage/upload", {
    method: "POST",
    body: nftMedia,
    headers: {
      Authorization: `Bearer ${process.env.NFT_STORAGE_API_KEY}`,
      "Content-Type": "*/*",
    },
  });
  console.log("DEBUG: nftStorageRes", nftStorageRes);
  const nftStorageResJson = await nftStorageRes.json();
  console.log("DEBUG: nftStorageResJson", nftStorageResJson);

  return NextResponse.json({ message: "ok" });
}
