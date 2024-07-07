const { productsRepo } = require("../repo/product.js");

const getAllProducts = async (req, res) => {
  try {
    const data = await productsRepo.all_products();
    return res.status(201).json(data);
  } catch (error) {
    if (error.code === 404) {
      return res.status(404).json(error);
    }
    return res.status(500).json(error.msg);
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await productsRepo.find_productById(id);
    return res.status(200).json(data);
  } catch (error) {
    if (error.code === 404) {
      return res.status(404).json(error);
    }
    return res.status(500).json(error.msg);
  }
};

const getBestSellingProducts = async (req, res) => {
  try {
    const data = await productsRepo.bestSellingProduct();
    return res.status(200).json(data);
  } catch (error) {
    if (error.code === 404) {
      return res.status(404).json(error);
    }
    return res.status(500).json(error.msg);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getBestSellingProducts,
};
