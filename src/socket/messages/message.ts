import { Socket, Server } from "socket.io";

async function socketOn(_: Server, socket: Socket, data: unknown) {
  console.log(`message, id: ${socket.id}, data: ${data}`);

  socket.emit("message", {
    idSocket: socket.id,
    youData: data,
    test: "test2",
  });
}

export default socketOn;
