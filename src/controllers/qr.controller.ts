import { TryCatch } from "../middlewares/error.middlewares.js";
import { NextFunction, Request, Response } from "express";
import pool from "../util/database.js";
import ErrorHandler from "../util/utility-class.js";
import QRCode from "qrcode";
import { uploadBufferToCloudinary } from "../util/cloudinary.js";
import { ExtenedRequest } from "../middlewares/auth.middleware.js";
import { QRRecord } from "../types/types.js";

export const generateQR = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
  const restaurantId = (req as any).restaurantId;
  const token = (req as any).token;

  if (!restaurantId || !token) {
    return next(new ErrorHandler("Incomplete registration flow.", 500));
  }

  const qrData = `http://localhost:3000/api/v1/restaurant/menu_item/${restaurantId}`;

  const qrBuffer = await QRCode.toBuffer(qrData);

  const qrUrl = await uploadBufferToCloudinary(qrBuffer, "restaurant_qrcodes", `qr_${restaurantId}`);

  await pool.query(
    "INSERT INTO qrs (restaurant_id, qr_code_url) VALUES (?, ?)",
    [restaurantId, qrUrl]
  );

  return res.status(201).json({
    success: true,
    message: "Restaurant registered successfully.",
    restaurantId,
    token,
    qr_code_url: qrUrl,
  });
});

export const getMyQR = TryCatch(async (req: ExtenedRequest, res: Response, next: NextFunction) => {
  const restaurantId = req.restaurantId;

  if (!restaurantId) {
    return next(new ErrorHandler("Unauthorized. Restaurant not found in token.", 401));
  }

  const [result] = await pool.query<QRRecord[]>(
    "SELECT * FROM qrs WHERE restaurant_id = ?",
    [restaurantId]
  );

  if ((result).length === 0) {
    return next(new ErrorHandler("QR code not found for this restaurant.", 404));
  }
  
  return res.status(200).json({
    success: true,
    qr: result[0],
  });
});
