const mongoose = require("mongoose");
const CONSTANTS = require("../config/constants");
const logger = require("../logger");

mongoose
  .connect(CONSTANTS.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {})
  .catch((error) => {
    logger.error(error);
  });

const conn = mongoose.connection;

conn.once("open", async () => {
  await conn.collection("videos").createIndexes({
    title: "text",
    description: "text",
  });
});

conn.on("connected", () => {
  logger.info("database is connected successfully 😍!!");
});
conn.on("disconnected", () => {
  logger.info("database is disconnected successfully");
});

conn.on("error", (error) => {
  logger.info("Error while connecting the db 😱!!");
  logger.error(error);
});
