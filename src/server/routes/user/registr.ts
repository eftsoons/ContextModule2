import { validate } from "email-validator";
import express from "express";
import globalError from "../../../constant/globalError";
import checkPassword from "../../../utils/server/checkPassword";
import createdUser from "../../../database/user/createdUser";
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
route.post("/registr", async (req, res) => {
  const { email, password }: { email: unknown; password: unknown } = req.body;

  if (email && typeof email == "string" && validate(email)) {
    if (password && typeof password == "string" && checkPassword(password)) {
      const user = await createdUser(
        email,
        createdHashingSalt(password, token).hash,
      );

      if (user) {
        res.status(201).send({ success: true });
      } else {
        throw new globalError("US-10000");
      }
    } else {
      throw new globalError("US-10000", { fieldName: { password: "Invalid" } });
    }
  } else {
    throw new globalError("US-10000", { fieldName: { email: "Invalid" } });
  }
});

export default route;
