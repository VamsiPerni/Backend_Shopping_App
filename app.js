const dotEnv = require("dotenv");
dotEnv.config();
const express = require("express");
require("./config/db");
const cookieParser = require("cookie-parser");

const { apiRouter } = require("./api/v1/routes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log("----");
  console.log(new Date(), req.method, req.url);
  console.log("----");
  next();
});

app.use("/api/v1", apiRouter);

app.listen(8080, () => {
  console.log("--------Server is RUNNING---------");
});
