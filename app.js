const express = require("express");
const connection = require("./configration/DB.config");
const {
  userRouter,
  postRouter,
  commentRouter,
} = require("./router/app.router");
const app = express();
require("dotenv").config();

const port = process.env.PORT;
app.use(express.json());
app.use(userRouter, postRouter, commentRouter);
app.use("/uploads", express.static("uploads"));
connection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
