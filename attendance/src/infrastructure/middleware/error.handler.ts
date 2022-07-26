import { AxiosError } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AxiosError) {
    console.log(err);
    res.status(404).json({
      name: err.name,
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(400).json({
      name: err.name,
      message: err.message,
      stack: err.stack,
    });
  }
}
