import { NextFunction, Response, Request } from "express";
import { RowDataPacket } from "mysql2";

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


export interface MenuItem {
  id: number;
  restaurant_id: number;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category: string | null;
  is_available: boolean;
  created_at: Date;
  updated_at: Date;
}


export interface QRRecord  extends RowDataPacket {
  id: number;
  restaurant_id: number;
  qr_code_url: string;
  created_at: Date;
}

