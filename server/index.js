
const express = require("express");
const { Router } = require("express");
const cors = require("cors");

const app = express();
const router = Router();

app.use(express.json());
app.use(cors());

router
  .get("/", (req, res) => {
    res.status(200).send("getting");
  })

  .post("/", (req, res) => {
    res.status(200).send("postting");
  })

  .put("/", (req, res) => {
    res.status(200).send("putting");
  })

  .delete("/", (req, res) => {
    res.status(200).send("deleting");
  });

app.use("/", router);


app.listen(5000, console.log("server on port 5000"));
