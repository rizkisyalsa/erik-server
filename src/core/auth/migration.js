const { Client } = require("pg");
const bcrypt = require("bcryptjs");

let migration = async () => {
  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "12345",
    port: 5432
  });

  try {
    await client.connect();
    await client.query(
      "CREATE TABLE IF NOT EXISTS users( id serial PRIMARY KEY, username VARCHAR (50) UNIQUE NOT NULL, password VARCHAR (100) NOT NULL, name VARCHAR (50), role TEXT, foto TEXT)"
    );

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash("admin", salt);
    let queryFirstUser =
      "INSERT INTO users (username, password, name, role) VALUES($1, $2, $3, $4) RETURNING *";
    let valueFirstUser = ["admin", hashPassword, "Super Admin", "admin"];

    let res = await client.query(queryFirstUser, valueFirstUser);
    if (res) {
      console.log("Username and password have been created");
      console.log({
        username: "admin",
        password: "admin"
      });
    }
    await client.end();
  } catch (err) {
    console.log(err.message);
    console.log({
      username: "admin",
      password: "admin"
    });
    await client.end();
  }
};

module.exports = {
  migration
};