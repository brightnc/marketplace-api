const { queryDB } = require("../config/db");

const productsRepo = {
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
  find_productById: async (id) => {
    try {
      const sql = `SELECT s.item_id,s.user_id as seller_id,u.username as seller_name,s.item_name,s.item_description,s.img_url,s.item_price,s.item_quantity,s.promotion_id,p.discount_price,p.start_time,p.end_time,p.status,pt.type_name,sc.subcategory_name,c.category_name 
      FROM sell_items as s 
      LEFT JOIN promotion as p on s.promotion_id=p.promotion_id 
      LEFT JOIN promotion_type as pt on p.promotion_type_id=pt.promotion_type_id 
      LEFT JOIN users as u on s.user_id=u.user_id 
      LEFT JOIN subcategory as sc on s.subcategory_id=sc.subcategory_id 
      LEFT JOIN category as c on sc.category_id=c.category_id
      WHERE s.item_id=?;`;
      const rows = await queryDB(sql, [id]);
      if (rows.length < 1 ) {
        throw { code: 404, msg: "product id not found in sell_items" };
      }
      return { code: 200, msg: "success", data: rows };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  bestSellingProduct: async () => {
    try {
      const sql = `SELECT 
    s.item_id,
    s.item_name,
    s.img_url,
    s.item_price,
    SUM(o.quantity) AS total_quantity_sold
FROM 
    order_items o
LEFT JOIN 
    sell_items s ON o.item_id = s.item_id
GROUP BY 
    s.item_id,s.item_name,s.img_url,s.item_price
ORDER BY 
    total_quantity_sold DESC
    LIMIT 5;`;
      const rows = await queryDB(sql);
      if (rows.length < 1) {
        throw { code: 404, msg: "product not found" };
      }
      return { code: 200, msg: "success", data: rows };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

module.exports = { productsRepo };
