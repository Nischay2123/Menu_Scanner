import mysql from 'mysql2/promise';
import dotenv from "dotenv"
dotenv.config()


const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});



console.log('MySQL connection pool created.');

export default pool;