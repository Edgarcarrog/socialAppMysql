require("dotenv").config();

const express = require("express");
const app = express();
const promisePool = require("./src/db/pool");
const userRoutes = require("./src/routes/users.routes");
const hobbieRoutes = require("./src/routes/hobbies.routes");
const { urlencoded } = require("express");

//settings
app.set("port", process.env.PORT || 4000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);
app.use(hobbieRoutes);

// promisePool.query("DROP TABLE IF EXISTS users");

promisePool.query(
  "CREATE TABLE IF NOT EXISTS users (userId INTEGER PRIMARY KEY AUTO_INCREMENT, name VARCHAR(30) DEFAULT NULL, avatar VARCHAR(30) DEFAULT NULL, birthday DATE DEFAULT NULL, mail VARCHAR(50) DEFAULT NULL)"
);

promisePool.query(
  "CREATE TABLE IF NOT EXISTS hobbies (hobbieId INTEGER PRIMARY KEY AUTO_INCREMENT, hobbie INTEGER DEFAULT NULL, userId INTEGER, FOREIGN KEY (userId) REFERENCES users (userId))"
);

app.listen(app.get("port"), console.log(`Server on port ${app.get("port")}`));
