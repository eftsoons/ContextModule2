import prisma from "..";

async function getAllCourseCount() {
  return await prisma.course.count();
}

export default getAllCourseCount;
