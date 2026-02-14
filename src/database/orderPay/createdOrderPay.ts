import prisma from "..";
import { StatusPay } from "../prisma/enums";

async function createdOrderPay(
  userId: number,
  courseId: number,
  statusPay: StatusPay,
) {
  return await prisma.orderPay.create({
    data: { userId: userId, courseId: courseId, status_pay: statusPay },
  });
}

export default createdOrderPay;
