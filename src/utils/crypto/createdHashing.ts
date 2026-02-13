import { createHash } from "crypto";

function createdHashing(data: string) {
  return createHash("sha256").update(data).digest("hex");
}

export default createdHashing;
