import prisma from "..";

async function getAllCourseId(courseId: number) {
  return await prisma.course.findFirst({
    where: { id: courseId },
    include: { lessons: true },
  });
}

export default getAllCourseId;
