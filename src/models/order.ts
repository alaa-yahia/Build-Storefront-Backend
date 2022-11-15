import Client from "../database";

export type OrderType = {
  id?: number;
  status: string;
  user_id: string;
};
export type OrderProductType = {
  id: number;
  quantity: number;
  order_id: string;
  product_id: string;
};

export class OrderStore {
  async create(order: OrderType): Promise<OrderType> {
    try {
      const { status, user_id } = order;
      const connection = await Client.connect();
      const sql =
        "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *";
      const result = await connection.query(sql, [status, user_id]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`an error occured while adding order: ${error}`);
    }
  }

  async currentOrderByUser(user_id: number): Promise<OrderProductType[]> {
    try {
      const connection = await Client.connect();
      const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='open'";
      const result = await connection.query(sql, [user_id]);
      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`an error occured while getting orders: ${error}`);
    }
  }
}

export default OrderStore;
