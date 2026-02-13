import { randomBytes } from "crypto";

const token = randomBytes(32).toString("hex");
const tokenCookie = randomBytes(32).toString("hex");

console.log(`Токен для шифрования: ${token}`);
console.log(`Токен для куков: ${tokenCookie}`);
