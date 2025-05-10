import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.middlewares.js";
import pool from "../util/database.js";
import ErrorHandler from "../util/utility-class.js";
import { ExtenedRequest } from "../middlewares/auth.middleware.js";
import { MenuItem } from "../types/types.js";

export const addMenuItem = TryCatch(async (req: ExtenedRequest, res: Response, next: NextFunction) => {
    const { name, description, halfPrice, fullPrice, image_url, category, isVeg, is_available } = req.body;
  
    if (!name || !fullPrice) {
      return next(new ErrorHandler("Name and fullPrice are required", 400));
    }
  
    await pool.query(
      `INSERT INTO menu_items (restaurant_id, name, description, halfPrice, fullPrice, image_url, category, isVeg, is_available)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.restaurantId, name, description, halfPrice, fullPrice, image_url, category, isVeg, is_available ]
    );
  
    res.status(201).json({
      success:true,
      message: "Menu item added successfully."
    });
  });

export const getMenuItems = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = parseInt(req.params.id);
  
    const [rows] = await pool.query(
      "SELECT * FROM menu_items WHERE restaurant_id = ?",
      [restaurantId]
    );
  
  res.status(200).json({
    succes: true,
    menu: rows
  });
  });
  
export const updateMenuItem = TryCatch(async (req: ExtenedRequest, res: Response, next: NextFunction) => {
    const itemId = parseInt(req.params.id); 
    const { name, description, halfPrice, fullPrice, image_url, category, isVeg, is_available } = req.body;
  
    const [existing] = await pool.query(
      "SELECT * FROM menu_items WHERE id = ? AND restaurant_id = ?",
      [itemId, req.restaurantId]
    );
  
    if ((existing as MenuItem[]).length === 0) {
      return next(new ErrorHandler("Menu item not found or unauthorized", 404));
    }
  
    await pool.query(
      `UPDATE menu_items SET name = ?, description = ?, halfPrice = ?, fullPrice = ?, image_url = ?, 
       category = ?, isVeg = ?, is_available = ?, updated_at = NOW()
       WHERE id = ? AND restaurant_id = ?`,
      [name, description, halfPrice, fullPrice, image_url, category, isVeg, is_available, itemId, req.restaurantId]
    );
  
  res.status(200).json({
    success:true,
    message: "Menu item updated successfully."
  });
  });
  
export const deleteMenuItem = TryCatch(async (req: ExtenedRequest, res: Response, next: NextFunction) => {
    const itemId = parseInt(req.params.id); 
  
    const [existing] = await pool.query(
      "SELECT * FROM menu_items WHERE id = ? AND restaurant_id = ?",
      [itemId, req.restaurantId]
    );
  
    if ((existing as MenuItem[]).length === 0) {
      return next(new ErrorHandler("Menu item not found or unauthorized", 404));
    }
  
    await pool.query("DELETE FROM menu_items WHERE id = ? AND restaurant_id = ?", [
      itemId,
      req.restaurantId,
    ]);
  
  res.status(200).json({
    success:true,
    message: "Menu item deleted successfully."
  });
  });