import { createConnection } from "typeorm";
import { parse } from "pg-connection-string";

const connectionOptions = parse(
  "postgres://kzduzaripdfyew:41dfa42666f295c4052262bd7a38b10ecfb4ac787560068e888e9a984919785d@ec2-52-87-135-240.compute-1.amazonaws.com:5432/d70ss0d4uije0q"
);

console.log(connectionOptions);

const typeOrmOptions = {
  type: "postgres",
  host: connectionOptions.host,
  port: connectionOptions.port,
  username: connectionOptions.username,
  password: connectionOptions.password,
  database: connectionOptions.database,
  ssl: true,
  entities: ["./src/models/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
};

createConnection(typeOrmOptions);
