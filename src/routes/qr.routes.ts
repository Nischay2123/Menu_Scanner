import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { getMyQR } from "../controllers/qr.controller.js";

const app = express();



// route /api/v1/restaurant/QR/:id
app.get("/QR/:id",isAuthenticated, getMyQR);



export default app;
