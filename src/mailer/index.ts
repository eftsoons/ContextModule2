import nodemailer from "nodemailer";
import { tokenMail } from "../config";

const transporter = nodemailer.createTransport(tokenMail);

export default transporter;
