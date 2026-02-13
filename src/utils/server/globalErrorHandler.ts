import { NextFunction, Request, Response } from "express";

import globalError, { type GlobalErrorType } from "../../constant/globalError";

export default (
  error: GlobalErrorType,
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof globalError) {
    res.status(error.codeResponse).send(error.getResponse());
  } else {
    next(error);
  }
};
