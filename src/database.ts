import { Pool } from "pg";
import {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  NODE_ENV,
  POSTGRES_TEST_DB,
} from "./config";

let client: any;

if (NODE_ENV === "dev") {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
  });
}

if (NODE_ENV === "test") {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
  });
}

export default client;
