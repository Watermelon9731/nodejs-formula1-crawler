const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const racesRouter = require("./routes/races");

const app = express();

// setup cheerio and request-promise
// const cheerio = require("cheerio");
// const request = require("request-promise");
// const target = "https://formula1.com/en/latest.html";
// request(target, (err, res, html) => {
//   if (!err && res.statusCode == 200) {
//     const $ = cheerio.load(html);

//     $(".f1-cc--caption").each((idx, el) => {
//       const article = $(el).find(".f1-cc--caption p").text();
//       console.log(article);
//     });
//   } else {
//     console.log(err);
//   }
// });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(indexRouter);
app.use(usersRouter);
app.use(racesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(async (err, req, res, next) => {
  try {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  } catch (error) {
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  }
});

module.exports = app;
