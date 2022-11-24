import supertest from "supertest";
import { app } from "../../server";
import client from "../../database";

const request = supertest(app);

describe("Checking returned status code from /products endpoint is correct", () => {
  it("should return 200 when creating new user", async () => {
    const response = await request
      .post("/users")
      .send({ firstName: "axe", lastName: "tree", password: "apple" });
    expect(response.status).toEqual(200);
  });
  it("should return 200 when getting all the users", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJwYXNzd29yZCI6IiQyYiQxMCREYW96UFljYVpFZzNNSkx3QzhaYXh1N2JQcDlmRHFvdTZNMXpLNXh3MmRMRVVaeHRmMkNBeSJ9LCJpYXQiOjE2NjkyMzkwMzl9.Tx0iZsg3b5_qS0axeBX2tbXo7OrBca8XrGwGiwmvhn4";
    const response = await request
      .get(`/users`)
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });

  it("should return 200 when querying a user", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJwYXNzd29yZCI6IiQyYiQxMCREYW96UFljYVpFZzNNSkx3QzhaYXh1N2JQcDlmRHFvdTZNMXpLNXh3MmRMRVVaeHRmMkNBeSJ9LCJpYXQiOjE2NjkyMzkwMzl9.Tx0iZsg3b5_qS0axeBX2tbXo7OrBca8XrGwGiwmvhn4";

    const response = await request
      .get("/products/1")
      .set("Authorization", "Bearer " + token);
    expect(response.status).toEqual(200);
  });

  afterAll(async () => {
    const connection = await client.connect();
    const sql = "DELETE FROM users;";
    await connection.query(sql);
    await connection.release();
  });
});
