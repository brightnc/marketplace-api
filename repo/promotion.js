const { queryDB } = require("../config/db");

const promotionRepo = {
  findPromotionById: async (promotion_id, item_id) => {
    try {
      const sql = `SELECT discount_price, item_id,start_time,end_time,status FROM promotion WHERE promotion_id = ? AND item_id = ? ;`;
      const rows = await queryDB(sql, [promotion_id, item_id]);
      if (rows.length < 1) {
        throw new Error("Promotion not found or invalid id.");
      }
      return rows[0];
    } catch (error) {
      console.error(error);
      throw new Error("Failed to find promotion.");
    }
  },
};

module.exports = { promotionRepo };
