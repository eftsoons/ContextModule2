import { createCipheriv, randomBytes } from "crypto";
import { token as TokenENV } from "../../config";

function encryption(
  data: string,
  iv: string | undefined = randomBytes(16).toString("hex"),
  token: string = TokenENV,
) {
  const cipheriv = createCipheriv(
    "aes-256-cbc",
    Buffer.from(token, "hex"),
    Buffer.from(iv, "hex"),
  );

  const dataEncryption =
    cipheriv.update(data, "utf8", "hex") + cipheriv.final("hex");

  return { data: dataEncryption, iv: iv };
}

export default encryption;
