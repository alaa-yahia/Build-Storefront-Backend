import supertest from "supertest";
import { app } from "../../server";
import client from "../../database";

const request = supertest(app);

describe("Checking returned status code from /orders endpoint is correct", () => {
  it("should return 401 when creating new order without jwt", async () => {
    const response = await request
      .post("/orders")
      .send({ user_id: 1, status: "open" });
    expect(response.status).toEqual(401);
  });

  it("should return 200 when creating new order with jwt", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJwYXNzd29yZCI6IiQyYiQxMCREYW96UFljYVpFZzNNSkx3QzhaYXh1N2JQcDlmRHFvdTZNMXpLNXh3MmRMRVVaeHRmMkNBeSJ9LCJpYXQiOjE2NjkyMzkwMzl9.Tx0iZsg3b5_qS0axeBX2tbXo7OrBca8XrGwGiwmvhn4";
    const userReq = await request
      .post("/users")
      .send({ firstName: "axe", lastName: "tree", password: "apple" });

    const response = await request
      .post("/orders")
      .send({ user_id: userReq.body.id, status: "open" })
      .set("Authorization", "Bearer " + token);
    expect(response.status).toEqual(200);
  });

  afterAll(async () => {
    const connection = await client.connect();
    await connection.query("DELETE FROM orders_products;");
    await connection.query("DELETE FROM orders;");
    await connection.query("DELETE FROM users;");
    connection.release();
  });
});
