// Supported networks to track the activity
export const activityNetworks = [
  "ethereum",
  "optimism",
  "base",
  "zora",
] as const;

// Supported networks to claim the stardrop
export const claimNetworks = ["optimism", "base", "zora"] as const;

export type StardropActivityNetwork = (typeof activityNetworks)[number];
export type StardropClaimNetwork = (typeof claimNetworks)[number];
