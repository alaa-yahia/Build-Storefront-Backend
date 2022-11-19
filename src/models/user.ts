import { hashSync, compareSync, genSaltSync } from "bcrypt";
import { SALT_ROUNDS, BCRYPT_PASS } from "../config";
import Client from "../database";

export type UserType = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<UserType[]> {
    try {
      const connection = await Client.connect();
      const sql = "SELECT * FROM products";
      const res = await connection.query(sql);
      connection.release();
      const usersWithoutPass = res.rows.map((user: UserType) => {
        return { ...user, password: "" };
      });
      return usersWithoutPass;
    } catch (error) {
      throw new Error(`an error occured wjile getting users: ${error}`);
    }
  }

  async create(user: UserType): Promise<UserType> {
    try {
      const { firstname, lastname, password } = user;
      const connection = await Client.connect();
      const sql =
        "INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *";
      const hash = hashSync(
        password + BCRYPT_PASS,
        genSaltSync(Number(SALT_ROUNDS))
      );
      const result = await connection.query(sql, [firstname, lastname, hash]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `an error occured while creating ${user.firstname} user : ${error}`
      );
    }
  }

  async authenticate(user: UserType): Promise<UserType | null> {
    try {
      const { firstname, lastname, password } = user;
      const connection = await Client.connect();
      const sql = "SELECT * FROM users WHERE firstName=($1) AND lastName=($2)";

      const result = await connection.query(sql, [firstname, lastname]);

      if (result.rows.length) {
        const user = result.rows[0];

        if (compareSync(password + BCRYPT_PASS, user.password)) {
          return user;
        }
      }
      return null;
    } catch (error) {
      throw new Error(
        `an error occured while creating ${user.firstname} user : ${error}`
      );
    }
  }
}
