const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });

const conn = mongoose.connection;

conn.on("connected", function () {
  console.log("database is connected successfully 😍!!");
});
conn.on("disconnected", function () {
  console.log("database is disconnected successfully");
});

conn.on("error", (error) => {
  console.log("Error while connecting the db 😱!!");
  console.log(error);
});
