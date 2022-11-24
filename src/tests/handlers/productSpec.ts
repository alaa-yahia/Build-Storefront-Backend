import supertest from "supertest";
import jwt from "jsonwebtoken";
import { app } from "../../server";
import client from "../../database";
import { TOKEN } from "../../config";

const request = supertest(app);

describe("Checking returned status code from /products endpoint is correct", () => {
  it("should return 200 when getting all the products", async () => {
    const response = await request.get(`/products`);
    expect(response.status).toBe(200);
  });

  it("should return 401 when creating new product without jwt", async () => {
    const response = await request.post("/products");
    expect(response.status).toEqual(401);
  });

  it("should return 200 when creating new product with jwt", async () => {
    const jwtT = jwt.sign({ id: 1 }, TOKEN as string);

    const response = await request
      .post("/products")
      .send({ name: "Tornado", price: 300, category: "drinks" })
      .set("Authorization", "Bearer " + jwtT);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      id: response.body.id,
      name: "Tornado",
      price: 300,
      category: "drinks",
    });
  });

  it("should return 200 when querying a product", async () => {
    const jwtT = jwt.sign({ id: 1 }, TOKEN as string);

    const createdProduct = await request
      .post("/products")
      .send({ name: "Tornado", price: 300, category: "drinks" })
      .set("Authorization", "Bearer " + jwtT);
    const product = createdProduct.body;
    const response = await request.get(`/products/${product.id}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(product);
  });

  afterAll(async () => {
    const connection = await client.connect();
    const sql = "DELETE FROM products;";
    await connection.query(sql);
    await connection.release();
  });
});
