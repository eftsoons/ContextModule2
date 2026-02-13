import { Socket } from "socket.io";
import { NextSocket } from "../../type/socket";

export default (_: Socket, next: NextSocket) => {
  next();
};
