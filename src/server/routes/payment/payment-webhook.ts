import express from "express";
import getOrderPayId from "../../../database/orderPay/getOrderPayId";
import updateOrderPayStatusPayId from "../../../database/orderPay/updateOrderPayStatusPayId";
import createdCoursesUser from "../../../database/coursesUser/createdCoursesUser";

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
route.post("/payment-webhook", async (req, res) => {
  const reqBody: unknown = req.body;

  if (
    reqBody &&
    typeof reqBody == "object" &&
    "order_id" in reqBody &&
    "status" in reqBody &&
    typeof reqBody.order_id == "number" &&
    typeof reqBody.status == "string"
  ) {
    const { order_id, status } = reqBody;

    if (status == "success") {
      const orderPay = await getOrderPayId(order_id);

      if (orderPay) {
        await updateOrderPayStatusPayId(order_id, "success");

        await createdCoursesUser(orderPay.userId, orderPay.courseId);
      }
    } else {
      await updateOrderPayStatusPayId(order_id, "failed");
    }
  }

  res.status(204).send();
});

export default route;
