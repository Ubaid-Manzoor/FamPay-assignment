const express = require("express");
const api = require("./src/api");

require("dotenv").config({
  path: `${__dirname}/.env.${process.env.NODE_ENV}`,
});

const CONSTANTS = require("./src/config/constants");
require("./src/utils/dbConnect");
require("./src/cron/fetchVideos");
const errorHandler = require("./src/error/errorHandler");

const app = express();

app.use(express.json());
app.use("/api", api);
app.use(errorHandler);

app.listen(CONSTANTS.PORT || 3000);
