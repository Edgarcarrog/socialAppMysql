require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const promisePool = require("./src/database/pool");
const followRoutes = require("./src/v1/routes/follows.routes");
const postRoutes = require("./src/v1/routes/posts.routes");
const userRoutes = require("./src/v1/routes/users.routes");
const { urlencoded } = require("express");

//settings
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(express.json());
/* const corsOptions = {
  origin: "*",
  {
    origin: [
      "https://social-app-mysql-client.vercel.app",
      "http://localhost:3000/",
    ],
    optionsSuccessStatus: 200,
    credentials: true,
  }
}; */
// app.options("/api/v1/users/verify-user/:user", cors());

app.use(
  cors({
    origin: [
      "https://social-app-mysql-client.vercel.app/",
      "https://www.google.com/",
    ],
  })
);

/* 

app.use((req, res, next) => {
   res.setHeader(
     "Access-Control-Allow-Origin",
     "https://social-app-mysql-client.vercel.app/"
   );
   res.append("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
   next();
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
