// import { createConnection } from "typeorm";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect();
//createConnection(typeOrmOptions);
