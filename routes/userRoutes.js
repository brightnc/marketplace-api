const express = require("express");
const router = express.Router();
const { findUserById,getOrdersByUserId } = require("../controllers/userController.js");

router.get("/", findUserById);
router.get("/orders", getOrdersByUserId);

module.exports = router;
