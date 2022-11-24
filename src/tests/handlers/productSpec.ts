import supertest from "supertest";
import { app } from "../../server";
import client from "../../database";

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
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJwYXNzd29yZCI6IiQyYiQxMCREYW96UFljYVpFZzNNSkx3QzhaYXh1N2JQcDlmRHFvdTZNMXpLNXh3MmRMRVVaeHRmMkNBeSJ9LCJpYXQiOjE2NjkyMzkwMzl9.Tx0iZsg3b5_qS0axeBX2tbXo7OrBca8XrGwGiwmvhn4";
    const response = await request
      .post("/products")
      .send({ name: "Tornado", price: 300, category: "drinks" })
      .set("Authorization", "Bearer " + token);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      id: response.body.id,
      name: "Tornado",
      price: 300,
      category: "drinks",
    });
  });

  it("should return 200 when querying a product", async () => {
    const response = await request.get("/products/1");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      id: response.body.id,
      name: "Tornado",
      price: 300,
      category: "drinks",
    });
  });

  afterAll(async () => {
    const connection = await client.connect();
    const sql = "DELETE FROM products;";
    await connection.query(sql);
    await connection.release();
  });
});
