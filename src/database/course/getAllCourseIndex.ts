import prisma from "..";
import paginationCourses from "../../constant/pagination";

async function getAllCourseIndex(index: number = 1) {
  return await prisma.course.findMany({
    take: paginationCourses,
    skip: (index - 1) * paginationCourses,
  });
}

export default getAllCourseIndex;
