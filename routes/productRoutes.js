const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getBestSellingProducts,
  getCategory,
  getProductsBySubCategory
} = require("../controllers/productController.js");

router.get("/", getAllProducts);
router.get("/best-sell", getBestSellingProducts);
router.get("/categories", getCategory);
router.get("/categories/:category_id", getProductsBySubCategory);
router.get("/:id", getProductById);

module.exports = router;
