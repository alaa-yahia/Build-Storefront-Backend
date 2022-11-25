import supertest from "supertest";
import jwt from "jsonwebtoken";
import { app } from "../../server";
import client from "../../database";
import { TOKEN } from "../../config";

const request = supertest(app);

describe("Checking returned status code from /users endpoint is correct", () => {
  let user: unknown;
  beforeAll(async () => {
    user = await request
      .post("/users")
      .send({ firstName: "axe", lastName: "tree", password: "apple" });
  });
  it("should return 200 when creating new user", async () => {
    const response = await request
      .post("/users")
      .send({ firstName: "axe", lastName: "tree", password: "apple" });
    expect(response.status).toEqual(200);
  });

  it("should return 200 when getting all the users", async () => {
    const jwtT = jwt.sign({ user }, TOKEN as string);
    const response = await request
      .get(`/users`)
      .set("Authorization", "Bearer " + jwtT);
    expect(response.status).toBe(200);
  });

  it("should return 200 when querying a user", async () => {
    const jwtT = jwt.sign({ user }, TOKEN as string);
    const response = await request
      .get("/users/1")
      .set("Authorization", "Bearer " + jwtT);
    expect(response.status).toEqual(200);
  });

  afterAll(async () => {
    const connection = await client.connect();
    const sql = "DELETE FROM users;";
    await connection.query(sql);
    await connection.release();
  });
});
