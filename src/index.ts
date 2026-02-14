import express from "express";
import cors from "cors";
import routes from "./server/index";
import { port, tokenCookie } from "./config";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import createWebSocket from "./socket";
import verifyJSON from "./utils/server/verifyJSON";
import globalErrorHandler from "./utils/server/globalErrorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(verifyJSON);
app.use(cookieParser(tokenCookie));

app.use("/school-api", routes);

app.use(globalErrorHandler);

const server = createServer(app);

createWebSocket(server);

server.listen(port, () => {
  console.log(`Server start, url: http://localhost:${port}`);
});
