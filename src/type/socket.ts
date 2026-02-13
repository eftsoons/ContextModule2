import { ExtendedError } from "socket.io";

type NextSocket = (err?: ExtendedError | undefined) => void;

export { NextSocket };
