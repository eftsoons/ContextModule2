import { createDecipheriv } from "crypto";
import { token as TokenENV } from "../../config";

function decryption(data: string, iv: string, token: string = TokenENV) {
  const cipheriv = createDecipheriv(
    "aes-256-cbc",
    Buffer.from(token, "hex"),
    Buffer.from(iv, "hex"),
  );

  const dataEncryption =
    cipheriv.update(data, "hex", "utf8") + cipheriv.final("utf8");

  return dataEncryption;
}

export default decryption;
