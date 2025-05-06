import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../util/utility-class.js";
import { controllerTypes } from "../types/types.js";

export const errorMiddlerware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  (err.message ||= "Interal server Error"), (err.statusCode ||= 500);


  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });
};

export const TryCatch =
  (func: controllerTypes) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };
