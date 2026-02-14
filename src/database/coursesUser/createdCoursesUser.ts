import prisma from "..";

async function createdCoursesUser(userId: number, courseId: number) {
  return await prisma.coursesUser.create({
    data: { userId: userId, courseId: courseId },
  });
}

export default createdCoursesUser;
