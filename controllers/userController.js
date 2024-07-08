const { userRepo } = require("../repo/user.js");
const { orderRepo } = require("../repo/order.js");

const findUserById = async (req, res) => {
  const user_id = req.user.user_id;
  try {
    const data = await userRepo.findUserByid(user_id);
    return res.status(200).json({ code: 200, message: "success", data: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOrdersByUserId = async (req, res) => {
    const user_id = req.user.user_id;
    try {
      const data = await orderRepo.findOrdersByUserId(user_id);
      return res.status(200).json({ code: 200, message: "success", data: data });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

module.exports = {
    findUserById,
    getOrdersByUserId
};
