const { queryDB } = require("../config/db");

const categoryRepo = {
  getCategory: async (promotion_id, item_id) => {
    try {
      const sql = `SELECT c.category_id,c.category_name,sc.subcategory_id,sc.subcategory_name FROM subcategory as sc LEFT JOIN category as c on sc.category_id=c.category_id ;`;
      const rows = await queryDB(sql);
      if (rows.length < 1) {
        throw new Error("Category not found.");
      }
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  findProductsBySubcategoryId: async (subcategory_id) => {
    try {
      const sql = `SELECT s.item_id,s.user_id as seller_id,u.username as seller_name,s.item_name,s.item_description,s.img_url,s.item_price,s.item_quantity,s.promotion_id,p.discount_price,p.start_time,p.end_time,p.status,pt.type_name,sc.subcategory_name,c.category_name 
      FROM sell_items as s 
      LEFT JOIN promotion as p on s.promotion_id=p.promotion_id 
      LEFT JOIN promotion_type as pt on p.promotion_type_id=pt.promotion_type_id 
      LEFT JOIN users as u on s.user_id=u.user_id 
      LEFT JOIN subcategory as sc on s.subcategory_id=sc.subcategory_id 
      LEFT JOIN category as c on sc.category_id=c.category_id
      WHERE s.subcategory_id=?;`;
      const rows = await queryDB(sql, [subcategory_id]);
      return { code: 200, msg: "success", data: rows };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
};

module.exports = { categoryRepo };
