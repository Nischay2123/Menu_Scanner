import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "nischay@123",
  database: "menu_scanner_db"
});

console.log('MySQL connection pool created.');

export default pool;