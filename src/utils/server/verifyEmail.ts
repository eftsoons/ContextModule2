import { validate } from "email-validator";

function verifyEmail(email: unknown): email is string {
  return typeof email == "string" && validate(email);
}

export default verifyEmail;
