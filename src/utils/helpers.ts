import { PublicKey } from "@solana/web3.js";

export function arrayToRecord<T>(
  source: readonly T[],
  getKey: (item: T) => string
) {
  return source.reduce((all, a) => ({ ...all, [getKey(a)]: a }), {}) as Record<
    string,
    T
  >;
}

export function tryParsePublicKey(key: string): PublicKey | undefined {
  try {
    return new PublicKey(key);
  } catch {
    return undefined;
  }
}
