"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var mongoose = require("mongoose");

var moviesRoutes = require("./routes/movies");

var usersRoutes = require("./routes/user");

var app = express(); //database connection

mongoose.connect("mongodb+srv://shubham5631:143mpd&Me@cluster0.c2raw.mongodb.net/binzWatch?retryWrites=true&w=majority", {
  useNewUrlParser: true
}).then(function () {
  console.log('connected to database');
})["catch"](function (err) {
  console.log(err);
  console.log('connection failed');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requsted-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});
app.use("/media", moviesRoutes);
app.use("/user", usersRoutes);
module.exports = app;