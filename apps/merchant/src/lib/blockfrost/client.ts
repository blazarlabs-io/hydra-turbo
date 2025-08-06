import { BlockfrostProvider } from "@meshsdk/core";

export const blockfrost = new BlockfrostProvider(
  process.env.NEXT_PUBLIC_BLOCKFROST_PROJECT_KEY,
);
