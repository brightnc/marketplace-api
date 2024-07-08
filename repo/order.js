const {
  queryDB,
  beginTransaction,
  commitTransaction,
  rollbackTransaction,
} = require("../config/db");

const orderRepo = {
  createOrder: async (user_id, item_id, qty, promotion_id) => {
    try {
      console.log(">>>>>>>>>>", user_id, item_id, qty, promotion_id);
      await beginTransaction();
      const sqlItem = `SELECT item_price,item_quantity FROM sell_items WHERE item_id =?`;
      const itemRows = await queryDB(sqlItem, [item_id]);
      if (itemRows.length < 1) {
        throw new Error("Item not found.");
      }
      const item_price = itemRows[0].item_price;
      const item_quantity = itemRows[0].item_quantity;

      if (qty > item_quantity) {
        throw new Error("Not enough quantity.");
      }

      if (promotion_id !== 0) {
      }
      const sqlPromotion = `SELECT discount_price,start_time,end_time,status FROM promotion WHERE promotion_id=? AND item_id=?`;
      const promotionRows = await queryDB(sqlPromotion, [
        promotion_id,
        item_id,
      ]);
      if (promotionRows.length < 1) {
        throw new Error("Promotion not found.");
      }

      const now = Date.now();
      if (now > promotionRows[0].end_time) {
        throw new Error("Promotion time is over.");
      }
      if (now < promotionRows[0].start_time) {
        throw new Error("Promotion time has not started yet.");
      }
      if (promotionRows[0].status == 0) {
        throw new Error("Promotion is close.");
      }

      const sqlUserCash = `SELECT cash  FROM users WHERE user_id=? ;`;
      const rowsUserCash = await queryDB(sqlUserCash, [
        user_id,
      ]);

      const newPrice = item_price - promotionRows[0].discount_price;
      const finalPrice = newPrice * qty;
      if(rowsUserCash[0].cash < finalPrice){
        throw new Error("Not enough cash in wallet.");
      }
      const sqlOrder = `INSERT INTO orders (user_id,promotion_id,final_price ) VALUES (?,?,?) ;`;
      const rowsOrder = await queryDB(sqlOrder, [
        user_id,
        promotion_id,
        finalPrice,
      ]);
      if (rowsOrder.affectedRows < 1) {
        throw new Error("Create order failed 11.");
      }
      const insertedOrderId = rowsOrder.insertId;
      rowsOrder[0];

      const sqlOrderId = `SELECT order_id FROM orders WHERE id =?`;
      const rowsOrderId = await queryDB(sqlOrderId, [insertedOrderId]);
      if (rowsOrderId.length < 1) {
        throw new Error("Not found OrderId.");
      }
      const orderId = rowsOrderId[0].order_id;

      const sqlOrderItem = `INSERT INTO order_items (order_id,item_id,quantity,unit_price ) VALUES (?,?,?,?) ;`;
      const rowsOrderItem = await queryDB(sqlOrderItem, [
        orderId,
        item_id,
        qty,
        newPrice,
      ]);
      if (rowsOrderItem.affectedRows < 1) {
        throw new Error("Create order item failed.");
      }
      rowsOrderItem[0];
      const sqlUpdateItem = `UPDATE sell_items SET item_quantity = item_quantity - ? WHERE item_id = ?;`;
      const rowsUpdateItem = await queryDB(sqlUpdateItem, [qty, item_id]);
      if (rowsUpdateItem.affectedRows < 1) {
        throw new Error("Create order item failed.");
      }
      const sqlUpdateCash = `UPDATE users SET cash = cash - ? WHERE user_id = ?;`;
      const rowsUpdateCash = await queryDB(sqlUpdateCash, [finalPrice, user_id]);
      if (rowsUpdateCash.affectedRows < 1) {
        throw new Error("Update Cash failed.");
      }
      await commitTransaction();
    } catch (error) {
      await rollbackTransaction();
      console.error(error);
      throw new Error("Create order failed.");
    }
  },
  findOrdersByUserId:async(user_id)=>{
    try {
      const sql = `SELECT o.order_id,o.final_price,o.status,i.item_name,i.img_url,ot.quantity FROM orders as o LEFT JOIN order_items as ot on o.order_id=ot.order_id LEFT JOIN sell_items as i on ot.item_id=i.item_id WHERE o.user_id=? ;`;
      const rows = await queryDB(sql, [user_id]);
    
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error("Order not found user_id : "+id);
    }
  }
};

module.exports = { orderRepo };
