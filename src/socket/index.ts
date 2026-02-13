import { type Server as TypeServer } from "http";
import { Server } from "socket.io";
import { frontendUrl } from "../config";
import auth from "./middleware/auth";
import getMessages from "../utils/socket/getMessages";
import { sync } from "fast-glob";
import { join } from "path";

async function createWebSocket(server: TypeServer) {
  const io = new Server(server, {
    cors: {
      origin: frontendUrl,
      credentials: true,
    },
  });

  const allFile = sync("**/*.js", {
    absolute: true,
    objectMode: true,
    cwd: join(__dirname, "./messages"),
  });

  const allMessages = await getMessages(allFile);

  io.use(auth);

  io.on("connection", (socket) => {
    console.log(`connect, id: ${socket.id}`);

    for (const { name, fun } of allMessages) {
      socket.on(name, (data) => fun(io, socket, data));
    }
  });
}

export default createWebSocket;
