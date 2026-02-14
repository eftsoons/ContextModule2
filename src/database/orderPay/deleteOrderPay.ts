import prisma from "..";

async function deleteOrderPay(orderPayId: number) {
  return await prisma.orderPay.delete({ where: { id: orderPayId } });
}

export default deleteOrderPay;
