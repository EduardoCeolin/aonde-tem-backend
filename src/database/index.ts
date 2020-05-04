import { Client } from "pg";
import { createConnection } from "typeorm";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

console.log(client);

client.connect();
