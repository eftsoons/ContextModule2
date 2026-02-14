import { Socket, Server } from "socket.io";
import createdCoursesUser from "../../database/coursesUser/createdCoursesUser";
import getOrderPayId from "../../database/orderPay/getOrderPayId";
import updateOrderPayStatusPayId from "../../database/orderPay/updateOrderPayStatusPayId";

async function socketOn(_: Server, ___: Socket, data: unknown) {
  if (
    data &&
    typeof data == "object" &&
    "order_id" in data &&
    "status" in data &&
    typeof data.order_id == "number" &&
    typeof data.status == "string"
  ) {
    const { order_id, status } = data;

    if (status == "success") {
      const orderPay = await getOrderPayId(order_id);

      if (orderPay) {
        await updateOrderPayStatusPayId(order_id, "Pay");

        await createdCoursesUser(orderPay.userId, orderPay.courseId);
      }
    } else {
      await updateOrderPayStatusPayId(order_id, "ErrorPay");
    }
  }
}

export default socketOn;
