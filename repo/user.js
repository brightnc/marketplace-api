const { queryDB } = require("../config/db");

const userRepo = {
  login: async (username, password) => {
    try {
      const sql = `SELECT user_id, username,role FROM users WHERE username = ? AND password = ? ;`;
      const rows = await queryDB(sql, [username, password]);
      if (rows.length < 1) {
        throw new Error("User not found or invalid credentials.");
      }
      return rows[0];
    } catch (error) {
      console.error(error);
      throw new Error("Authentication failed.");
    }
  },
};

module.exports = { userRepo };
