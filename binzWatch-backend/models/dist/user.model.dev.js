"use strict";

var mongoose = require('mongoose');

var bcrypt = require('bcryptjs');

var uniqueValidator = require("mongoose-unique-validator");

var userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: 'Full name can\'t be empty'
  },
  email: {
    type: String,
    required: 'Email can\'t be empty',
    unique: true
  },
  password: {
    type: String,
    required: 'Password can\'t be empty',
    minlength: [4, 'Password must be atleast 4 character long']
  },
  saltSecret: String
});
userSchema.plugin(uniqueValidator); // Custom validation for email

userSchema.path('email').validate(function (val) {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'Invalid e-mail.'); // Events

userSchema.pre('save', function (next) {
  var _this = this;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(_this.password, salt, function (err, hash) {
      _this.password = hash; // this.saltSecret = salt;

      next();
    });
  });
});
module.exports = mongoose.model('User', userSchema);