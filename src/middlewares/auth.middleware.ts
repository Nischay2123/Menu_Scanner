import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ErrorHandler from "../util/utility-class.js";



export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ErrorHandler("Authorization token missing", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    ( req as Request).restaurantId = decoded.id; // Attach to request
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return next(new ErrorHandler("Token expired. Please log in again.", 401));
    }
    return next(new ErrorHandler("Invalid token.", 403));
  }
};
