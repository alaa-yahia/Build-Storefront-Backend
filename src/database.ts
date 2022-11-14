import { Pool } from "pg"
import {POSTGRES_HOST,POSTGRES_DB,POSTGRES_USER} from "./config"

const client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
})

export default client