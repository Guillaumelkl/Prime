const express = require('express');
const router = express.Router();


const UserRegistry = require("../Controllers/registerController");
const userLogin = require("../Controllers/loginController");



router.post("/register", UserRegistry);
router.post("/login", userLogin );




module.exports = router;
