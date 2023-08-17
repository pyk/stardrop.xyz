import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { Session } from "@/lib/session";
import { createStardrop } from "@/database/actions/stardrop";

if (!process.env.NFT_STORAGE_API_KEY) {
  throw new Error(`NFT_STORAGE_API_KEY is undefined`);
}

const NFTStorageUploadSchema = z.object({
  value: z.object({
    cid: z.string(),
  }),
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Make sure user is signed in
  const session = await Session.fromRequest(req);
  if (session.address == null) {
    return NextResponse.json({ message: "Access denied" }, { status: 403 });
  }

  // Extract form data
  const formData = await req.formData();

  // Upload media to nft.storage first
  const media: File | null = formData.get("media") as unknown as File;
  if (!media) {
    return NextResponse.json(
      { message: "Stardrop media not found" },
      { status: 400 }
    );
  }
  let mediaCid = null;
  try {
    const nftStorageRes = await fetch("https://api.nft.storage/upload", {
      method: "POST",
      body: media,
      headers: {
        Authorization: `Bearer ${process.env.NFT_STORAGE_API_KEY}`,
        "Content-Type": "*/*",
      },
    });
    const nftStorageResJson = await nftStorageRes.json();
    const data = NFTStorageUploadSchema.parse(nftStorageResJson);
    mediaCid = data.value.cid;
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Failed to upload the media to ipfs" },
      { status: 500 }
    );
  }

  try {
    const newStardrop = await createStardrop({
      creator: session.address,
      name: formData.get("name") as string,
      symbol: formData.get("symbol") as string,
      description: formData.get("description") as string,
      mediaCid,
      activityType: formData.get("activityType") as string,
      activityNetwork: formData.get("activityNetwork") as string,
      activityData: formData.get("activityData") as string,
    });

    return NextResponse.json(newStardrop);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Failed to insert new stardrop" },
      { status: 500 }
    );
  }
}
