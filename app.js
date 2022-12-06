const express = require("express");
const app = express();
const morgan = require("morgan");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

//-----------------------------add routers paths-----------------------------//

const cardsRouter = require("./src/router/Cards");
const formRouter = require("./src/router/FormCourses");
const histoRouter = require("./src/router/Historiques");
const secondCardsRouter = require("./src/router/SecondCards");
const usersRouter = require("./src/router/Users");
//-----------------------------Connect with mongodb-----------------------------//

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("mongo connected"))
  .catch((err) => console.log(err));

//-----------------------------middleware-----------------------------//
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
// app.use(express.static(path.join(__dirname, "public")));

//-----------------------------Routers---------------------------//

app.use("/users", usersRouter);
app.use("/card", cardsRouter);
app.use("/form", formRouter);
app.use("/histoRouter", histoRouter);
app.use("/secondCardsRouter", secondCardsRouter);

//-----------------------------Handling errors---------------------//

app.use((req, res, next) => {
  const error = new Error("Not found");
  res.status(404);
  next(error);
});
app.use((error, req, res, next) => {
  res.status(500 | Error.status).json({
    message: error.message,
  });
});
module.exports = app;
