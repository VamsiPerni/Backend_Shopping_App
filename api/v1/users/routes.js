const express = require("express");
const { getUserDetailsController } = require("./controllers");

const userRouter = express.Router();

userRouter.get("/", getUserDetailsController);

module.exports = { userRouter };
