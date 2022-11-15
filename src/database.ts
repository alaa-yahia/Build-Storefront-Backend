import { Pool, PoolConfig } from "pg";
import { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, NODE_ENV } from "./config";

let client = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
});

if (NODE_ENV === "test") {
  client = new Pool({
    host: "localhost",
    database: "test_db",
    user: "alaa",
  });
}
export default client;
