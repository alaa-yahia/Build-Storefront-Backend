import { UserStore, UserType } from "../models/user";
import { hashSync, compareSync, genSaltSync } from "bcrypt";
import { SALT_ROUNDS, BCRYPT_PASS } from "../config";

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
        id: 2,
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
        id: 2,
        firstname: "tree",
        lastname: "sun",
      })
    );
  });
});
