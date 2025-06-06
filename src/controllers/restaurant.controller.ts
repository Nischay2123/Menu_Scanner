import { NextFunction, Request, Response } from "express";
import pool from "../util/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { TryCatch } from "../middlewares/error.middlewares.js";
import ErrorHandler from "../util/utility-class.js";
import { Restaurant } from "../types/types.js";
import { ExtenedRequest } from "../middlewares/auth.middleware.js";




export const registerRestaurant = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { name, contact_info, location, email, password } = req.body;
  
    if (!name || !email || !password) {
      return next(new ErrorHandler("Name, email, and password are required.", 400));
    }
  
    const [existing] = await pool.query(
      "SELECT * FROM restaurants WHERE email = ?",
      [email]
    );
  
    if ((existing as any[]).length > 0) {
      return next(new ErrorHandler("Email already in use.", 409));
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const [result] = await pool.query(
      "INSERT INTO restaurants (name, contact_info, location, email, password, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
      [name, contact_info, location, email, hashedPassword]
    );
  
    const restaurantId = (result as any).insertId;
  
    const token = jwt.sign({ id: restaurantId }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
  
    (req as any).restaurantId = restaurantId;
    (req as any).token = token;
  
    return next();
  });
  


  
export const login = TryCatch(async (req: Request, res: Response, next:NextFunction) =>
{
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Email and password are required.",400))

    }

        const [rows] = await pool.query(
            "SELECT * FROM restaurants WHERE email = ?",
            [email]
        );

        if ((rows as Restaurant[]).length === 0) {
            return next(new ErrorHandler("Invalid credentials.",401))

        }
        
        const restaurant = (rows as Restaurant[])[0]; 
        const isMatch = await bcrypt.compare(password, restaurant.password);
        if (!isMatch) {
            return next(new ErrorHandler("Invalid credentials.",401))
        }

        const token = jwt.sign({ id: restaurant.id }, process.env.JWT_SECRET!, {
            expiresIn: "1d",
        });

        return res.status(200).json({
            success:true,
            message: "Login successful.",
            restaurantId: restaurant.id,
            token,
        });
});

export const updateRestaurantProfile = TryCatch(async (req: ExtenedRequest, res: Response, next: NextFunction) => {
    const paramId = parseInt(req.params.id);
    const tokenRestaurantId = req.restaurantId; 

    if (paramId !== tokenRestaurantId) {
        return next(new ErrorHandler("Unauthorized to update this profile", 403));
    }

    const { name, contact_info, location, email} = req.body;

    const [result] = await pool.query(
        "UPDATE restaurants SET name = ?, contact_info = ?, location = ?, email=? WHERE id = ?",
        [name, contact_info, location,email, paramId]
    );

    return res.status(200).json({
        success:true,
        message: "Restaurant profile updated successfully.",
    });
});

 
export const getRestaurantProfile = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = parseInt(req.params.id);

    const [rows] = await pool.query(
        "SELECT id, name, contact_info, location, email, created_at FROM restaurants WHERE id = ?",
        [restaurantId]
    );

    const restaurant = (rows as Restaurant[])[0];

    if (!restaurant) {
        return next(new ErrorHandler("Restaurant not found", 404));
    }

    // console.log(process.env.CLOUDINARY_CLOUD_NAME);

    return res.status(200).json({
        success:true,
        restaurant
    });
});


