const { productsRepo } = require("../repo/product.js");
const { categoryRepo } = require("../repo/category.js");

const getAllProducts = async (req, res) => {
  try {
    const data = await productsRepo.all_products();
    return res.status(200).json(data);
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

const getCategory = async (req, res) => {
  try {
    const data = await categoryRepo.getCategory();
    const categories = {};
    for (let i = 0; i < data.length; i++) {
      if (!categories[data[i].category_id]) {
        categories[data[i].category_id] = {
          category_id: data[i].category_id,
          category_name: data[i].category_name,
          subcategories: [],
        };
      }
      categories[data[i].category_id].subcategories.push({
        subcategory_id: data[i].subcategory_id,
        subcategory_name: data[i].subcategory_name,
      });
    }
    return res.status(200).json(Object.values(categories));
  } catch (error) {
    return res.status(500).json(error.msg);
  }
  
  
};

const getProductsBySubCategory = async (req, res) => {
  const {category_id} = req.params;
  try {
    const data = await categoryRepo.findProductsBySubcategoryId(category_id);
    return res.status(200).json(data);
  } catch (error) {
    if (error.code === 404) {
      return res.status(404).json(error);
    }
    return res.status(500).json(error.msg);
  }
}
module.exports = {
  getAllProducts,
  getProductById,
  getBestSellingProducts,
  getCategory,
  getProductsBySubCategory
};
