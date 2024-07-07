const { userRepo } = require("../repo/user.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const data = await userRepo.login(username, password);
    const token = jwt.sign(
      { user_id: data.user_id, username: data.username, role: data.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.status(201).json({ token: token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
};
