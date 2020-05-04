require("dotenv/config");

module.exports = {
  type: "postgres",
  host: process.env.HEROKU_HOST,
  port: 5432,
  username: process.env.HEROKU_USERNAME,
  password: process.env.HEROKU_PASSWORD,
  database: process.env.HEROKU_DATABASE,
  entities: ["./src/models/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
};
