import client from "../../database";
import { OrderStore, OrderType } from "../../models/order";
import { UserStore } from "../../models/user";

const userStore = new UserStore();
const store = new OrderStore();

describe("testing for functions definitions", () => {
  it("tests for create func", () => {
    expect(store.create).toBeDefined();
  });
  it("tests for currentOrderByUser func", () => {
    expect(store.currentOrderByUser).toBeDefined();
  });
});

describe("testing for functions results", () => {
  it("order:tests create func return the specified result", async () => {
    const user = await userStore.create({
      id: 1,
      firstname: "Alaa",
      lastname: "Yahia",
      password: "axon",
    });
    const result: OrderType = await store.create({
      id: 1,
      status: "open",
      user_id: String(user.id),
    });
    expect(result).toEqual({
      id: result.id,
      status: "open",
      user_id: String(user.id),
    });
  });

  it("order: tests if index func return correct result", async () => {
    const result: OrderType[] = await store.currentOrderByUser(3);
    expect(result).toEqual([
      {
        id: 2,
        status: "open",
        user_id: "3",
      },
    ]);
  });

  afterAll(async () => {
    const connection = await client.connect();
    await connection.query("DELETE FROM orders_products;");
    await connection.query("DELETE FROM orders;");
    await connection.query("DELETE FROM users;");
    connection.release();
  });
});
