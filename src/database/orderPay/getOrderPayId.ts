import prisma from "..";

async function getOrderPayId(orderPayId: number) {
  return await prisma.orderPay.findFirst({ where: { id: orderPayId } });
}

export default getOrderPayId;
