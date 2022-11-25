import client from "../database";

export type OrderProductType = {
  id: number;
  order_id: string;
  product_id: string;
  quantity: number;
};

export class OrdersProductsStore {
  async index(): Promise<OrderProductType[]> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM orders_products";
      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  async show(id: string): Promise<OrderProductType> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM orders_products where order_id=$1";
      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  async create(orderProduct: OrderProductType): Promise<OrderProductType> {
    try {
      const { order_id, product_id, quantity } = orderProduct;
      console.log({ orderProduct });
      const connection = await client.connect();
      const sql =
        "INSERT into orders_products (order_id, product_id, quantity) VALUES($1,$2,$3) RETURNING *";
      const result = await connection.query(sql, [
        order_id,
        product_id,
        quantity,
      ]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`an error occured while adding order: ${error}`);
    }
  }
}
