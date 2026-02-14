import express from "express";
import auth, { RequsetAuth } from "../../middleware/auth";
import { format } from "date-fns";

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
route.get("/orders", auth, (req, res) => {
  const reqMiddleware = req as RequsetAuth;

  const dataCourse = reqMiddleware.userInfo.orderPay.map((data) => ({
    id: data.course.id,
    payment_status: data.status_pay,
    name: data.course.name,
    description: data.course.description,
    hours: data.course.duration,
    img: data.course.img,
    start_date: format(data.course.dateStart, "dd.MM.yyyy"),
    end_date: format(data.course.dateEnd, "dd.MM.yyyy"),
    price: data.course.price,
  }));

  res.send({
    data: dataCourse,
  });
});

export default route;
