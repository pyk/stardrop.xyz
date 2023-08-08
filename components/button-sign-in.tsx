"use client";

import { Button } from "./ui/button";
import { useState, useEffect } from "react";
// import AuthClient, { generateNonce } from "@walletconnect/auth-client";

// import { useWeb3Modal } from "@web3modal/react";

export function ButtonSignIn() {
  // ButtonSignIn States
  // authClient = NULL, show "Initializing..."
  // authClient != NULL && isSignInInProgress = false, show "Sign In"
  // authClient != NULL && isSignInInProgress = true, show "Signing In..."

  // const [authClient, setAuthClient] = useState<AuthClient | null>();
  const [authClient, setAuthClient] = useState<{} | null>();
  // const [isSignInInProgress, setIsSignInInProgress] = useState<boolean>(false);
  // const web3Modal = useWeb3Modal();

  // // 1. Initialize the AuthClient
  // useEffect(() => {
  //   const initializeAuthClient = async () => {
  //     try {
  //       const client = await AuthClient.init({
  //         relayUrl:
  //           process.env.NEXT_PUBLIC_WALLETCONNECT_AUTH_RELAY_URL ||
  //           "wss://relay.walletconnect.com",
  //         projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  //         metadata: {
  //           name: "Stardrop",
  //           description:
  //             "Permissionless platform to reward onchain activity with NFT",
  //           url: window.location.host,
  //           icons: [],
  //         },
  //       });
  //       setAuthClient(client);
  //       client.on("auth_response", ({ params }) => {
  //         console.log("DEBUG: auth_response", params);
  //       });
  //       console.debug("Stardrop: AuthClient successfully initialized");
  //     } catch (err) {
  //       console.log("Stardrop: Failed to initialize AuthClient");
  //       console.error(err);
  //     }
  //   };

  //   // Only initialize if not initizialized yet
  //   if (authClient == null) {
  //     console.debug("Stardrop: Initializing AuthClient for the first time");
  //     initializeAuthClient();
  //   }
  // });

  // const onSignIn = async () => {
  //   console.log("DEBUG: onSignIn executed", authClient);
  //   if (authClient == null) {
  //     // TODO: show toast
  //     throw new Error(`Stardrop: authClient not initialized`);
  //   }
  //   setIsSignInInProgress(true);
  //   const { uri } = await authClient.request({
  //     aud: window.location.href,
  //     domain: window.location.hostname.split(".").slice(-2).join("."),
  //     chainId: "eip155:1",
  //     type: "eip4361",
  //     nonce: generateNonce(),
  //     statement: "Sign in with wallet.",
  //   });
  //   if (uri == null) {
  //     // TODO: show toast
  //     throw new Error(`Stardrop: Authentication uri is null`);
  //   }
  //   await web3Modal.open({ uri });
  // };

  // Conditional render based on states
  if (authClient == null) {
    return <Button variant="ghost">Initializing...</Button>;
  }

  // if (authClient != null && isSignInInProgress == false) {
  //   return (
  //     <Button variant="ghost" onClick={onSignIn}>
  //       Sign in
  //     </Button>
  //   );
  // }

  // if (authClient != null && isSignInInProgress == true) {
  //   return <Button variant="ghost">Signing in...</Button>;
  // }
}
