import { NextFunction, Request, Response } from "express";
import globalError from "../../constant/globalError";
import decrypto from "../../utils/crypto/decrypto";
import getUserEmail, {
  getUserEmailReturn,
} from "../../database/user/getUserEmail";

interface RequsetAuth extends Request {
  userInfo: NonNullable<Awaited<getUserEmailReturn>>;
}

export default async (req: Request, _: Response, next: NextFunction) => {
  const reqMiddleware = req as RequsetAuth;

  const auth = req.headers.authorization;

  try {
    if (auth) {
      const [_, authToken] = auth.split("Bearer ");

      if (authToken) {
        const tokenDecrypto = decrypto(authToken);

        if (tokenDecrypto) {
          const tokenObject = JSON.parse(tokenDecrypto);

          if (
            "email" in tokenObject &&
            "password" in tokenObject &&
            typeof tokenObject.email == "string" &&
            typeof tokenObject.password == "string"
          ) {
            const { email, password } = tokenObject;

            const user = await getUserEmail(email);

            if (user && user.password == password) {
              reqMiddleware.userInfo = user;

              next();
            } else {
              throw new globalError("US-10100");
            }
          } else {
            throw new globalError("US-10100");
          }
        } else {
          throw new globalError("US-10100");
        }
      } else {
        throw new globalError("US-10100");
      }
    } else {
      throw new globalError("US-10100");
    }
  } catch {
    throw new globalError("US-10100");
  }
};

export type { RequsetAuth };
