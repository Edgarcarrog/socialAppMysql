require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const promisePool = require("./database/pool");
const followRoutes = require("./v1/routes/follows.routes");
const postRoutes = require("./v1/routes/posts.routes");
const userRoutes = require("./v1/routes/users.routes");
const { urlencoded } = require("express");

//settings
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(
  cors({
    origin: "*",
    /* origin: "https://social-app-mysql-client.vercel.app", */
  })
);
app.use(express.json());
//app.use(urlencoded({ extended: true }));

/* app.options("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(204);
}); */

//routers
app.use("/api/v1", followRoutes);
app.use("/api/v1", postRoutes);
app.use("/api/v1", userRoutes);

try {
  /* promisePool.query("DROP TABLE IF EXISTS users");
  promisePool.query("DROP TABLE IF EXISTS posts");
  promisePool.query("DROP TABLE IF EXISTS follows");
   */

  promisePool.query("SET lc_time_names = 'es_ES';");

  promisePool.query(
    "CREATE TABLE IF NOT EXISTS users (userId VARCHAR(255) PRIMARY KEY, name VARCHAR(30) DEFAULT NULL, mail VARCHAR(50) DEFAULT NULL, password VARCHAR(255) DEFAULT NULL, birthday DATE DEFAULT NULL, email_verified BOOLEAN DEFAULT 0)"
  );

  promisePool.query(
    "CREATE TABLE IF NOT EXISTS posts (Id VARCHAR(255) PRIMARY KEY, description VARCHAR(255), tags VARCHAR(255), likes INT DEFAULT 0, userId VARCHAR (255), rate DOUBLE(40,10), date DATETIME)"
  );

  promisePool.query(
    "CREATE TABLE IF NOT EXISTS follows (Id VARCHAR(255) PRIMARY KEY, followerId VARCHAR(255), followingId VARCHAR(255))"
  );

  promisePool.query(
    "CREATE TABLE IF NOT EXISTS likes_users (Id VARCHAR(255) PRIMARY KEY, postId VARCHAR(255), userId VARCHAR(255))"
  );

  app.listen(app.get("port"), console.log(`Server on port ${app.get("port")}`));
} catch (error) {
  console.log(error);
}
