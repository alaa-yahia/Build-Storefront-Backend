import client from "../../database";
import { OrderStore, OrderType } from "../../models/order";
import { UserStore, UserType } from "../../models/user";

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
  let user = {} as UserType;
  beforeAll(async () => {
    user = await userStore.create({
      id: 1,
      firstname: "Alaa",
      lastname: "Yahia",
      password: "axon",
    });
  });

  it("order:tests create func return the specified result", async () => {
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
    const result: OrderType[] = await store.currentOrderByUser(
      user.id as number
    );
    expect(result).toEqual([
      {
        id: 3,
        status: "open",
        user_id: String(user.id) as any,
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
