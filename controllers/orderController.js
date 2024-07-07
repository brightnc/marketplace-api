const { orderRepo } = require("../repo/order.js");

const createOrder = async (req, res) => {
  const { item_id, promotion_id, qty } = req.body;
  console.log("<<<<<", item_id);
  const user_id = req.user.user_id;
  try {
    await orderRepo.createOrder(user_id, item_id, qty, promotion_id);
    return res.status(201).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
};
