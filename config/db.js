const mysql = require("mysql2");
require("dotenv").config();
let db;
const initDatabase = () => {
  if (!db) {
    db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    db.connect((err) => {
      if (err) {
        console.error("Database connection error:", err.stack);
        return;
      }
      console.log("Connected to database");
    });
  }
};

const queryDB = (sql, value = []) => {
  return new Promise((resolve, reject) => {
    db.query(sql, value, (err, rows) => {
      if (err) {
        reject({ msg: "Database query error", error: err });
      } else {
        resolve(rows);
      }
    });
  });
};

const beginTransaction = () => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((err) => {
      if (err) {
        reject({ msg: "Transaction start error", error: err });
      } else {
        resolve();
      }
    });
  });
};

const commitTransaction = () => {
  return new Promise((resolve, reject) => {
    db.commit((err) => {
      if (err) {
        reject({ msg: "Transaction commit error", error: err });
      } else {
        resolve();
      }
    });
  });
};

const rollbackTransaction = () => {
  return new Promise((resolve, reject) => {
    db.rollback(() => {
      resolve();
    });
  });
};

module.exports = {
  initDatabase,
  queryDB,
  beginTransaction,
  commitTransaction,
  rollbackTransaction,
};
