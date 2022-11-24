import client from "../../database";
import { UserStore, UserType } from "../../models/user";

const store = new UserStore();

describe("testing for functions definitions", () => {
  it("tests for index func", () => {
    expect(store.index).toBeDefined();
  });
  it("tests for create func", () => {
    expect(store.create).toBeDefined();
  });
  it("tests for authenticate func", () => {
    expect(store.authenticate).toBeDefined();
  });
});

describe("testing for functions results", () => {
  it(":tests create func return specified result", async () => {
    const result: UserType = await store.create({
      id: 2,
      firstname: "tree",
      lastname: "sun",
      password: "axon",
    });
    expect(result).toEqual(
      jasmine.objectContaining({
        id: result.id,
        firstname: "tree",
        lastname: "sun",
      })
    );
  });

  it(":tests if authenticate func return correct result", async () => {
    const result: UserType | null = await store.authenticate({
      firstname: "tree",
      lastname: "sun",
      password: "axon",
    });

    expect(result).toEqual(
      jasmine.objectContaining({
        firstname: "tree",
        lastname: "sun",
      })
    );
  });

  afterAll(async () => {
    const connection = await client.connect();
    await connection.query("DELETE FROM users;");
    connection.release();
  });
});
