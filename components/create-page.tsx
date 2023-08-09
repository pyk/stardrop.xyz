"use client";

import { useSIWE } from "connectkit";
import { SignInButton } from "@/components/sign-in-button";

export function CreatePage() {
  const siwe = useSIWE();

  if (siwe.isSignedIn) {
    return <div>signed in</div>;
  } else {
    // flex-1 with parent flex and flex-col will fill remaining height
    return (
      <div className="flex-1 flex flex-col justify-center items-center space-y-4 md:space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="font-bold text-5xl max-w-[320px] sm:max-w-none text-center text-gray-900">
            Create on Stardrop
          </h1>
          <p className=" text-xl max-w-[320px] sm:max-w-none text-center text-gray-500">
            Start creating on Stardrop by connecting your wallet first.
          </p>
        </div>
        <div>
          <SignInButton size="lg" />
        </div>
      </div>
    );
  }
}
