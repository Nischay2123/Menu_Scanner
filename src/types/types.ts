import { NextFunction, Response, Request } from "express";

export type controllerTypes = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void | Response<any, Record<string, any>>>;
  

  export type Restaurant = {
    id: number;
    name: string;
    contact_info: string | null;
    location: string | null;
    email: string;
    password: string;
    created_at: Date;
};
