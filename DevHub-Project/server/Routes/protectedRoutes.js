const express = require("express");
const router = express.Router();
const authorize = require("../authorize")

const postProject  = require('../Controllers/postProjectControllers');

router.post("/postProject", authorize, postProject)