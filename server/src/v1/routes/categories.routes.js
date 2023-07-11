const { Router } = require("express");

const {
  getCategory,
  createtCategory,
} = require("../../controllers/category.controller");

const router = Router();

router.get("/hobbies/:userId", getCategory);

router.post("/hobbies", createtCategory);

module.exports = router;
