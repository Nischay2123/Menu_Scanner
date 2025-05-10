import express from "express";
import { getRestaurantProfile, login, registerRestaurant, updateRestaurantProfile } from "../controllers/restaurant.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { generateQR } from "../controllers/qr.controller.js";

const app = express();

// route /api/v1/restaurant/new
app.post("/new", registerRestaurant,generateQR);

// route /api/v1/restaurant/login
app.post("/login", login);

// route /api/v1/restaurant/:id
app.get("/:id", getRestaurantProfile);

// route /api/v1/restaurant/login
app.put("/:id",isAuthenticated, updateRestaurantProfile);


export default app;
