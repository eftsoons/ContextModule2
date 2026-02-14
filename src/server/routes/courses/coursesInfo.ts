import express from "express";
import auth from "../user/auth";
import { RequsetAuth } from "../../middleware/auth";
import globalError from "../../../constant/globalError";
import getAllCourseId from "../../../database/course/getAllCourseId";

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
route.get("/courses/:course_id", auth, async (req, res) => {
  const courseId = req.params.course_id;

  if (courseId && typeof courseId == "string") {
    const courseIdNumber = Number(courseId);

    if (!isNaN(courseIdNumber)) {
      const courseInfo = await getAllCourseId(courseIdNumber);

      if (courseInfo) {
        res.send({
          data: courseInfo.lessons.map((data) => ({
            id: data.id,
            name: data.title,
            description: data.text,
            video_link: data.supertube_url,
            hours: data.duration,
          })),
        });
      } else {
        throw new globalError("US-10000");
      }
    } else {
      throw new globalError("US-10000");
    }
  } else {
    throw new globalError("US-10000");
  }
});

export default route;
