import { NextFunction, Request, Response } from "express";

import { SyntaxErrorExpress } from "../../type/express";
import globalError from "../../constant/globalError";

export default (
  error: SyntaxErrorExpress,
  _: Request,
  __: Response,
  next: NextFunction,
) => {
  if (error instanceof SyntaxError && error.type === "entity.parse.failed") {
    throw new globalError("US-10000");
  } else {
    next(error);
  }
};
