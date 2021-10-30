const express = require("express");
require("dotenv").config({
  path: `${__dirname}/.env.${process.env.NODE_ENV}`,
});

require("./src/utils/dbConnect");
require("./src/cron/fetchVideos");
const app = express();

app.listen(process.env.PORT || 3000);
