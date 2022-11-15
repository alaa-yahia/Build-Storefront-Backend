import { OrderStore, OrderType } from "../models/order";

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
  it("order:tests create func return specified result", async () => {
    const result: OrderType = await store.create({
      id: 1,
      status: "open",
      user_id: "1",
    });
    expect(result).toEqual({
      id: 1,
      status: "open",
      user_id: "1",
    });
  });

  it("order: tests if index func return correct result", async () => {
    const result: OrderType[] = await store.currentOrderByUser(1);
    expect(result).toEqual([
      {
        id: 1,
        status: "open",
        user_id: "1",
      },
    ]);
  });
});
