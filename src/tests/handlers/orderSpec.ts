import supertest from "supertest";
import jwt from "jsonwebtoken";
import { app } from "../../server";
import client from "../../database";
import { TOKEN } from "../../config";

const request = supertest(app);

describe("Checking returned status code from /orders endpoint is correct", () => {
  it("should return 401 when creating new order without jwt", async () => {
    const response = await request
      .post("/orders")
      .send({ user_id: 1, status: "open" });
    expect(response.status).toEqual(401);
  });

  it("should return 200 when creating new order with jwt", async () => {
    const jwtT = jwt.sign({ id: 1 }, TOKEN as string);

    const user = await request
      .get("/users/1")
      .set("Authorization", "Bearer " + jwtT);

    const response = await request
      .post("/orders")
      .send({ user_id: user.body.id, status: "open" })
      .set("Authorization", "Bearer " + jwtT);
    expect(response.status).toEqual(200);
  });

  it("should return 200 when getting user's open orders", async () => {
    const jwtT = jwt.sign({ id: 1 }, TOKEN as string);
    const createdUser = await request
      .post("/users")
      .send({ firstname: "axe", lastname: "tree", password: "apple" });
    const user = createdUser.body;

    const response = await request
      .get(`/orders/${1}`)
      .set("Authorization", "Bearer " + jwtT);

    expect(response.status).toEqual(200);
  });

  it("should add products for an order orders/:id/products]", async () => {
    const jwtT = jwt.sign({ id: 1 }, TOKEN as string);

    const user = await request
      .get("/users/1")
      .set("Authorization", "Bearer " + jwtT);

    const createdProduct = await request
      .post("/products")
      .send({ name: "Tornado", price: 100, category: "drinks" })
      .set("Authorization", "Bearer " + jwtT);
    const product = createdProduct.body;

    const createdOrder = await request
      .post("/orders")
      .send({ user_id: user.body.id, status: "open" })
      .set("Authorization", "Bearer " + jwtT);
    const order = createdOrder.body;

    const createOrderProduct = await request
      .post(`/orders/${order.id}/products`)
      .send({
        order_id: order.id,
        product_id: product.id,
        quantity: 4,
      })
      .set("Authorization", "Bearer " + jwtT);
    const orderProduct = createOrderProduct.body;

    expect(createOrderProduct.status).toEqual(200);
    expect(orderProduct).toEqual({
      id: 1,
      order_id: "2",
      product_id: "1",
      quantity: 4,
    });
  });

  afterAll(async () => {
    const connection = await client.connect();
    await connection.query("DELETE FROM orders_products;");
    await connection.query("DELETE FROM orders;");
    await connection.query("DELETE FROM users;");
    await connection.query("DELETE FROM products;");
    connection.release();
  });
});
