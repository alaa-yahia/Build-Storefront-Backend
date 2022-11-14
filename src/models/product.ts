import Client from "../database";

export type ProductType = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<ProductType[]> {
    try {
      const connection = await Client.connect();
      const sql = "SELECT * FROM products";
      const res = await connection.query(sql);
      connection.release();

      return res.rows;
    } catch (error) {
      throw new Error(`an error occured wjile getting products: ${error}`);
    }
  }

  async show(id: number): Promise<ProductType> {
    try {
      const connection = await Client.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";
      const res = await connection.query(sql, [id]);
      connection.release();

      return res.rows[0];
    } catch (error) {
      throw new Error(
        `an error occured while getting the specified product ${id}: ${error}`
      );
    }
  }

  async create(product: ProductType): Promise<ProductType> {
    try {
      const { name, price, category } = product;
      const connection = await Client.connect();
      const sql =
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
      const result = await connection.query(sql, [name, price, category]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `an error occured while adding ${product.name} product : ${error}`
      );
    }
  }

  async update(id: number, product: ProductType): Promise<ProductType> {
    try {
      const { name, price, category } = product;
      const connection = await Client.connect();
      const sql =
        "UPDATE products SET name = $2, price = $3, category = $4 WHERE id = $1 RETURNING *";
      const result = await connection.query(sql, [id, name, price, category]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `an error occured while updating ${product.name} product : ${error}`
      );
    }
  }

  async delete(id: number): Promise<ProductType> {
    try {
      const connection = await Client.connect();
      const sql = "DELETE FROM products WHERE id = ($1)";
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `an error occured while deleting the specified product : ${error}`
      );
    }
  }
}
