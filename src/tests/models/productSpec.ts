import client from "../../database";
import { ProductStore, ProductType } from "../../models/product";

const store = new ProductStore();

describe("testing for functions definitions", () => {
  it("tests for index func", () => {
    expect(store.index).toBeDefined();
  });
  it("tests for show func", () => {
    expect(store.show).toBeDefined();
  });
  it("tests for create func", () => {
    expect(store.create).toBeDefined();
  });
});

describe("testing for functions results", () => {
  it("Product:tests create func return specified result", async () => {
    const result: ProductType = await store.create({
      id: 1,
      name: "Tornado",
      price: 300,
      category: "drinks",
    });
    expect(result).toEqual({
      id: result.id,
      name: "Tornado",
      price: 300,
      category: "drinks",
    });
  });

  it("Product: tests if index func return correct result", async () => {
    const result: ProductType[] = await store.index();
    expect(result).toEqual([
      {
        id: result[0].id,
        name: "Tornado",
        price: 300,
        category: "drinks",
      },
    ]);
  });

  it("tests if show func return specified product", async () => {
    const createResult = await store.create({
      id: 1,
      name: "Tornado",
      price: 300,
      category: "drinks",
    });
    const result = await store.show(createResult.id);
    expect(result).toEqual({
      id: createResult.id,
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
