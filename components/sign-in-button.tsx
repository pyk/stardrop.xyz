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
  variant: "secondary";
  size: "sm" | "lg";
  show?: () => void;
  signIn?: () => void;
}) {
  const { variant, size, show, signIn } = props;
  return (
    <Button variant={variant} size={size} onClick={signIn ? signIn : show}>
      <div className="flex flex-row space-x-1 items-center">
        <span>Sign In</span>
        <ChevronRight className="ml-2 opacity-30 h-4 w-4" />
      </div>
    </Button>
  );
}

export function SignInButton(props: {
  variant?: "secondary";
  size?: "sm" | "lg";
}) {
  const siwe = useSIWE();
  const { variant, size } = props;

  return (
    <ConnectKitButton.Custom>
      {(props) => {
        const { show } = props;

        if (props.isConnected) {
          if (siwe.isSignedIn) {
            return <SignedAccount {...props} />;
          } else {
            return (
              <SignIn
                variant={variant ? variant : "secondary"}
                size={size ? size : "sm"}
                signIn={siwe.signIn}
              />
            );
          }
        } else {
          return (
            <SignIn
              variant={variant ? variant : "secondary"}
              size={size ? size : "sm"}
              show={show}
            />
          );
        }
      }}
    </ConnectKitButton.Custom>
  );
}
