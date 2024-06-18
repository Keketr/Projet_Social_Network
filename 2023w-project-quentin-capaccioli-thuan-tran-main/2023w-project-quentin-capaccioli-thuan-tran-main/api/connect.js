import mysql from "mysql";
// File to connect web application to database
// add your user, password and name of your database.
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Keketr23!",
  database: "social",
});
