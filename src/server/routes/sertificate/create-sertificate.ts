import express from "express";
import random from "../../../utils/random";

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
route.post("/create-sertificate", (_, res) => {
  //   const { student_id, course_id } = req.body;

  //нужна ссылка на сервис

  res.send({ course_number: `${random(10000, 99999)}1` });
});

export default route;
