"use client";

import { ChevronRight, Wallet } from "lucide-react";
import { Avatar, ConnectKitButton, useSIWE } from "connectkit";
import { Button } from "@/components/ui/button";
import { Icons } from "./icons";

export function SignedAccount(props: {
  show?: () => void;
  address?: `0x${string}`;
  ensName?: string;
  truncatedAddress?: string;
}) {
  const { show, address, ensName, truncatedAddress } = props;

  return (
    <Button
      className="flex flex-row space-x-2"
      variant={"ghost"}
      onClick={show}
    >
      <Avatar address={address} size={24} radius={8} />
      <span>{ensName ? ensName : truncatedAddress}</span>
    </Button>
  );
}

export function SignIn(props: { show?: () => void; signIn?: () => void }) {
  const { show, signIn } = props;

  return (
    <Button onClick={signIn ? signIn : show}>
      <Wallet size={24} className="mr-2" />
      Connect Wallet
    </Button>
  );
}

export function SignInButton() {
  const siwe = useSIWE();

  return (
    <ConnectKitButton.Custom>
      {(props) => {
        const { show } = props;

        if (props.isConnected) {
          if (siwe.isSignedIn) {
            return <SignedAccount {...props} />;
          } else {
            return <SignIn signIn={siwe.signIn} />;
          }
        } else {
          return <SignIn show={show} />;
        }
      }}
    </ConnectKitButton.Custom>
  );
}
