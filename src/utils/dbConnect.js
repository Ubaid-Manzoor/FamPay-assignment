const mongoose = require("mongoose");
const CONSTANTS = require("../config/constants");

mongoose
  .connect(CONSTANTS.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });

const conn = mongoose.connection;

conn.once("open", async () => {
  await conn.collection("videos").createIndexes({
    title: "text",
    description: "text",
  });
});

conn.on("connected", () => {
  console.log("database is connected successfully 😍!!");
});
conn.on("disconnected", () => {
  console.log("database is disconnected successfully");
});

conn.on("error", (error) => {
  console.log("Error while connecting the db 😱!!");
  console.log(error);
});
