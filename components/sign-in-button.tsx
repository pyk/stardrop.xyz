"use client";

import { ChevronRight } from "lucide-react";
import { Avatar, ConnectKitButton, useSIWE } from "connectkit";
import { Button } from "@/components/ui/button";

export function SignedAccount(props: {
  show?: () => void;
  address?: `0x${string}`;
  ensName?: string;
  truncatedAddress?: string;
}) {
  const { show, address, ensName, truncatedAddress } = props;

  return (
    <Button
      variant={"secondary"}
      className="flex flex-row space-x-2"
      onClick={show}
    >
      <Avatar address={address} size={24} />
      <span>{ensName ? ensName : truncatedAddress}</span>
    </Button>
  );
}

export function SignIn(props: {
  size: "sm" | "lg" | "jumbo";
  show?: () => void;
  signIn?: () => void;
}) {
  const { size, show, signIn } = props;
  return (
    <Button size={size} variant={"secondary"} onClick={signIn ? signIn : show}>
      <div className="flex flex-row space-x-1 items-center">
        <span>Sign In</span>
      </div>
    </Button>
  );
}

export function SignInButton(props: { size?: "sm" | "lg" | "jumbo" }) {
  const siwe = useSIWE();
  const { size } = props;

  return (
    <ConnectKitButton.Custom>
      {(props) => {
        const { show } = props;

        if (props.isConnected) {
          if (siwe.isSignedIn) {
            return <SignedAccount {...props} />;
          } else {
            return <SignIn size={size ? size : "sm"} signIn={siwe.signIn} />;
          }
        } else {
          return <SignIn size={size ? size : "sm"} show={show} />;
        }
      }}
    </ConnectKitButton.Custom>
  );
}
