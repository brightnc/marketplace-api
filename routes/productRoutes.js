const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getBestSellingProducts,
} = require("../controllers/productController.js");

router.get("/", getAllProducts);
router.get("/best-sell", getBestSellingProducts);
router.get("/:id", getProductById);

module.exports = router;
