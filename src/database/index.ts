import { Pool } from "pg";

const connectionString = {
  connectionString: process.env.DATABASE_URL,
};

const pool = new Pool(connectionString);

pool.connect();
