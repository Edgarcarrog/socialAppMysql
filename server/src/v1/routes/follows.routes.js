const { Router } = require("express");

const { getFollows } = require("../../controllers/follow.controller");

const router = Router();

router.get("/follows", getFollows);

module.exports = router;
