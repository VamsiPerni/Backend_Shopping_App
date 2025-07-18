const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB_URL, {
    dbName: "shopping-app",
  })
  .then(() => {
    console.log("----DB CONNECTED-----");
  })
  .catch((err) => {
    console.log("Database Connection Error");
    console.log(err.message);
    console.log("------------------------");
  });
