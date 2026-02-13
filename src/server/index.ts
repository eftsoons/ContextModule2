import express from "express";
import { join } from "path";
import { sync } from "fast-glob";
import swaggerJsdoc from "swagger-jsdoc";
import openApiOptions from "../constant/openApiOptions";

const route = express.Router();

const allFile = sync("**/*.js", {
  absolute: true,
  objectMode: true,
  cwd: join(__dirname, "./routes"),
});

(async () => {
  for (const file of allFile) {
    const moduleRoute = await import(file.path);

    if (
      typeof moduleRoute.default == "function" &&
      moduleRoute.default.name == "router"
    ) {
      route.use(moduleRoute.default);
    }
  }
})();

const options = { ...openApiOptions, apis: allFile.map((file) => file.path) };

const openapiSpecification = swaggerJsdoc(options);

export default route;
export { openapiSpecification };
