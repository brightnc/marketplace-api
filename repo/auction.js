const { queryDB } = require("../config/db");

const auctionRepo = {
  all_products: async () => {
    try {
      const sql = `SELECT s.item_id,s.user_id as seller_id,u.username as seller_name,s.item_name,s.item_description,s.img_url,s.item_price,s.item_quantity,s.promotion_id,p.discount_price,p.start_time,p.end_time,p.status,pt.type_name,sc.subcategory_name,c.category_name 
      FROM sell_items as s 
        LEFT JOIN promotion as p on s.promotion_id=p.promotion_id 
        LEFT JOIN promotion_type as pt on p.promotion_type_id=pt.promotion_type_id 
        LEFT JOIN users as u on s.user_id=u.user_id 
        LEFT JOIN subcategory as sc on s.subcategory_id=sc.subcategory_id 
        LEFT JOIN category as c on sc.category_id=c.category_id`;
      const rows = await queryDB(sql);
      return { code: 200, msg: "success", data: rows };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = { auctionRepo };
