"use strict";

var express = require("express");

var jwt = require("jsonwebtoken");

var bcrypt = require("bcryptjs");

var User = require("../models/user.model");

var router = express.Router();
router.post("/signup", function (req, res, next) {
  var user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password
  });
  user.save().then(function (result) {
    res.status(201).json({
      message: 'User created',
      result: result
    });
  })["catch"](function (err) {
    res.status(500).json({
      error: err
    });
  });
});
router.post("/signin", function (req, res, next) {
  var fetchedUser;
  User.findOne({
    email: req.body.email
  }).then(function (user) {
    if (!user) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }

    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then(function (result) {
    if (!result) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }

    var token = jwt.sign({
      email: fetchedUser.email,
      userId: fetchedUser._id
    }, "secret_this_should_be_longer", {
      expiresIn: "6h"
    });
    res.status(200).json({
      token: token,
      expiresIn: 21600
    });
  })["catch"](function (err) {
    return res.status(401).json({
      message: "Auth failed"
    });
  });
});
module.exports = router;