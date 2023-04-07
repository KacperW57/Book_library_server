const express = require("express");
const usersService = require("../services/users");
const router = express.Router();

router.post("/register", usersService.register);
router.post("/login", usersService.login);

//router.post("/login", usersService.login);

module.exports = router;
