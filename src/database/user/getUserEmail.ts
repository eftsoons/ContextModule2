import prisma from "..";

type getUserEmailReturn = ReturnType<typeof getUserEmail>;

async function getUserEmail(email: string) {
  return await prisma.user.findFirst({
    where: { email: email },
    include: {
      coursesUser: { include: { course: { include: { lessons: true } } } },
    },
  });
}

export default getUserEmail;
export type { getUserEmailReturn };
