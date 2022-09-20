import { PublicKey } from "@solana/web3.js";
import { blob, nu64, struct, Blob } from "buffer-layout";

export class PublicKeyLayout extends Blob {
  constructor(property) {
    super(32, property);
  }

  decode(b, offset) {
    return new PublicKey(super.decode(b, offset));
  }

  encode(src, b, offset) {
    return super.encode(src.toBuffer(), b, offset);
  }
}

export const TokenAccountLayout = struct([
  new PublicKeyLayout("mint"),
  new PublicKeyLayout("owner"),
  nu64("amount"),
  blob(93),
]);
