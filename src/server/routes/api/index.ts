import swaggerUi from "swagger-ui-express";
import express from "express";
import { openapiSpecification } from "../..";

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
route.use("/api", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

export default route;
