import { scryptSync, randomBytes } from "crypto";

function createdHashingSalt(
  data: string,
  salt: string | undefined = randomBytes(16).toString("hex"),
) {
  const hash = scryptSync(data, salt, 32);

  return { hash: hash.toString("hex"), salt: salt };
}

export default createdHashingSalt;
