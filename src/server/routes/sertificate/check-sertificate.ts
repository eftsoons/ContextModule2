import express from "express";
import globalError from "../../../constant/globalError";

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
route.post("/check-sertificate", (req, res) => {
  const { sertikate_number }: { sertikate_number: unknown } = req.body;

  if (
    (sertikate_number || sertikate_number == 0) &&
    typeof sertikate_number == "number"
  ) {
    const sertikate_string = sertikate_number.toString();

    if (sertikate_string.length == 6) {
      if (sertikate_string.at(-1) == "1") {
        res.send({ status: "success" });
      } else if (sertikate_string.at(-1) == "2") {
        res.send({ status: "failed" });
      } else {
        throw new globalError("US-10000");
      }
    } else {
      throw new globalError("US-10000");
    }
  }
});

export default route;
