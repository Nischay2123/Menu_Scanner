import express from 'express'
import pool from './util/database.js';
import morgan from 'morgan'
import cors from "cors";
import { errorMiddlerware } from "./middlewares/error.middlewares.js";
import dotenv from 'dotenv';
dotenv.config({
    path:"./.env"
})
    



// routes
import Restaurant from "./routes/resturant.routes.js";
import Menu_Items from "./routes/menu-item.routes.js";



const app = express();
const PORT = process.env.PORT || 3000;

pool.connect;

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

app.get("/",(req,res)=>{
    return res.send(`Api is working with api/v1`)
})
app.use("/api/v1/restaurant",Restaurant)
app.use("/api/v1/restaurant",Menu_Items)



app.use(errorMiddlerware)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});