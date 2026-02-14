import express from "express";
import globalError from "../../../constant/globalError";
import getUserEmail from "../../../database/user/getUserEmail";
import encrypto from "../../../utils/crypto/encrypto";
import createdHashingSalt from "../../../utils/crypto/createdHashingSalt";
import { token } from "../../../config";

const route = express.Router();

/**
 * @openapi
 * /api:
 *   get:
 *     tags:
 *      - main
 *     description: API документация
 *     responses:
 *       200:
 *         description: Вернет документацию API сформированную через OpenApi.
 */
route.post("/auth", async (req, res) => {
  const { email, password }: { email: unknown; password: unknown } = req.body;

  if (email && typeof email == "string") {
    const user = await getUserEmail(email);

    if (user) {
      if (
        password &&
        typeof password == "string" &&
        user.password == createdHashingSalt(password, token).hash
      ) {
        const token = encrypto(
          JSON.stringify({ email: user.email, password: user.password }),
        );

        if (token) {
          res.send({ token: token });
        } else {
          throw new globalError("US-10200", {
            fieldName: { password: ["Invalid data"] },
          });
        }
      } else {
        throw new globalError("US-10200", {
          fieldName: { password: ["Invalid data"] },
        });
      }
    } else {
      throw new globalError("US-10200", {
        fieldName: { email: ["Invalid data"] },
      });
    }
  } else {
    throw new globalError("US-10200", {
      fieldName: { email: ["Invalid data"] },
    });
  }
});

export default route;
