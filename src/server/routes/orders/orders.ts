import express from "express";
import auth, { RequsetAuth } from "../../middleware/auth";

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
route.post("/orders", auth, (req, res) => {
  const reqMiddleware = req as RequsetAuth;

  const dataCourse = reqMiddleware.userInfo.coursesUser.map((data) => ({
    id: data.course.id,
    name: data.course.name,
    description: data.course.description,
    hours: data.course.duration,
    img: data.course.img,
    start_date: data.course.dateStart,
    end_date: data.course.dateEnd,
    price: data.course.price,
  }));

  res.send({
    data: dataCourse,
  });
});

export default route;
