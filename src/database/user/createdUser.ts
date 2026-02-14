import prisma from "..";
import getUserEmail from "./getUserEmail";

async function createdUser(email: string, password: string) {
  const isCreated = await getUserEmail(email);

  if (!isCreated) {
    return await prisma.user.create({
      data: { email: email, password: password },
    });
  } else {
    return null;
  }
}

export default createdUser;
