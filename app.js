var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Import the mongoose module
const mongoose = require("mongoose");

// Set up default mongoose connection
const mongoDB =
  "mongodb+srv://mex:c7PIjpufgbGsN0gn@cluster0.3kr4ijo.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected")
);

// Get the default connection
const db = mongoose.connection;

const gc = async () => {
  const cat = require("./models/category");
  const grapicCards = new cat({
    name: "Graphic Cards",
    description: "graphic card",
  });
  await grapicCards.save();
};

// gc();

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = app;