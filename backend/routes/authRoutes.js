const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController"); // make sure path is correct

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
