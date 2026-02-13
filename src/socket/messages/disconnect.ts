import { Socket, Server } from "socket.io";

async function socketOn(__: Server, socket: Socket, _: unknown) {
  console.log(`disconnect, id: ${socket.id}`);
}

export default socketOn;
