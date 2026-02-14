import express from "express";
import globalError from "../../../constant/globalError";
import getAllCourseId from "../../../database/course/getAllCourseId";
import createdOrderPay from "../../../database/orderPay/createdOrderPay";
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
route.post("/courses/:course_id/buy", auth, async (req, res) => {
  const reqMiddleware = req as RequsetAuth;

  const courseId = req.params.course_id;

  if (courseId && typeof courseId == "string") {
    const courseIdNumber = Number(courseId);

    if (!isNaN(courseIdNumber)) {
      const courseInfo = await getAllCourseId(courseIdNumber);

      const now = new Date();

      if (
        courseInfo &&
        now > courseInfo.dateStart &&
        now < courseInfo.dateEnd
      ) {
        const newOrderPay = await createdOrderPay(
          reqMiddleware.userInfo.id,
          courseIdNumber,
          "WaitPay",
        );

        //нужна ссылка на оплату

        res.send({
          pay_url: `http://localhost:6475?order_id=${newOrderPay.id}`,
        });
      } else {
        throw new globalError("US-10000");
      }
    } else {
      throw new globalError("US-10000");
    }
  } else {
    throw new globalError("US-10000");
  }
});

export default route;
