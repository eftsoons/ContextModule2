import express from "express";
import auth from "../user/auth";
import globalError from "../../../constant/globalError";
import getOrderPayId from "../../../database/orderPay/getOrderPayId";
import deleteOrderPay from "../../../database/orderPay/deleteOrderPay";

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
route.get("/orders/:id", auth, async (req, res) => {
  const ordersId = req.params.id;

  if (ordersId && typeof ordersId == "string") {
    const orderIdNumber = Number(ordersId);

    if (!isNaN(orderIdNumber)) {
      const orderPay = await getOrderPayId(orderIdNumber);

      if (orderPay) {
        if (
          orderPay.status_pay == "failed" ||
          orderPay.status_pay == "success"
        ) {
          await deleteOrderPay(orderPay.id);

          res.send({ status: "success" });
        } else {
          res.status(418).send({ status: "was payed" });
        }
      } else {
        throw new globalError("US-10000");
      }
    } else {
      throw new globalError("US-10000");
    }
  }
});

export default route;
