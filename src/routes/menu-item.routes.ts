import { Router } from "express";
import {
  addMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menu-item.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

// Public route

// route /api/v1/restaurant/menu_item/:id
router.get("/menu_item/:id", getMenuItems);

// Protected routes

// route /api/v1/restaurant/new_menu_item
router.post("/new_menu_item", isAuthenticated, addMenuItem);

// route /api/v1/restaurant/menu_item/:id
router.put("/menu_item/:id", isAuthenticated, updateMenuItem);

// route /api/v1/restaurant/menu_item/:id
router.delete("/menu_item/:id", isAuthenticated, deleteMenuItem);

export default router;
