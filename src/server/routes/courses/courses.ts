import express from "express";
import { format } from "date-fns";

import globalError from "../../../constant/globalError";
import auth, { RequsetAuth } from "../../middleware/auth";
import paginationCourses from "../../../constant/pagination";
import getAllCourseIndex from "../../../database/course/getAllCourseIndex";
import getAllCourseCount from "../../../database/course/getAllCourseCount";

const route = express.Router();

/**
 * @openapi
 * /api:
 *   get:
 *     tags:
 *      - main
 *     description: API документация
 *     responses:
 *       200:
 *         description: Вернет документацию API сформированную через OpenApi.
 */
route.get("/courses", auth, async (_, res) => {
  const countCourses = await getAllCourseCount();

  const total = Math.ceil(countCourses / paginationCourses);

  const paginationCurrent = 1; // в доке не указано откуда брать

  const dataCourse = await getAllCourseIndex(paginationCurrent);

  res.send({
    data: dataCourse.map((data) => ({
      ...data,
      dateStart: format(data.dateStart, "dd.MM.yyyy"),
      dateEnd: format(data.dateStart, "dd.MM.yyyy"),
    })),
    pagination: {
      total: total,
      current: paginationCurrent,
      per_page: countCourses,
    },
  });
});

export default route;
