const { Router } = require("express");

const {
  getHobbies,
  createtHobbie,
} = require("../controllers/hobbie.controller");

const router = Router();

router.get("/hobbie/:userId", getHobbies);

router.post("/hobbie", createtHobbie);

module.exports = router;
