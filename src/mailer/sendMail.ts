import transporter from ".";
import { fromMail } from "../config";
import globalError from "../constant/globalError";

function sendMail(
  to: string,
  options?: {
    subject?: string;
    text?: string;
    html?: string;
    from?: string;
  },
) {
  try {
    const { subject, text, html, from = fromMail } = options ? options : {};

    transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
  } catch {
    throw new globalError("US-10100");
  }
}

export default sendMail;
