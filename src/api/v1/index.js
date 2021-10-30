const express = require("express");
const videoApi = require("./Videos");

const router = express.Router();

router.use("/videos", videoApi);

module.exports = router;
