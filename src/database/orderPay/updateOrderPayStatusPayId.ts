import prisma from "..";
import { StatusPay } from "../prisma/enums";

async function updateOrderPayStatusPayId(
  orderPayId: number,
  statusPay: StatusPay,
) {
  return await prisma.orderPay.update({
    where: { id: orderPayId },
    data: { status_pay: statusPay },
  });
}

export default updateOrderPayStatusPayId;
