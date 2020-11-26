"use strict";

var express = require("express");

var router = express.Router();

var Movie = require("../models/movie");

var checkAuth = require("../middleware/check-auth");

router.post("/addMovie", checkAuth, function (req, res, next) {
  console.log('heyy');
  var movies = req.body;
  var movie = new Movie({
    title: req.body.movieTitle,
    posterUrl: req.body.moviePosterLink,
    mediaUrl: req.body.movieMediaUrl,
    type: req.body.movieType
  });
  console.log(movie);
  movie.save();
  res.status(201).json({
    message: 'Movie added successfully !'
  });
});
router.get("/movies", function (req, res, next) {
  Movie.find().then(function (movies) {
    res.status(200).json({
      message: 'Movies fetched successfully !',
      movies: movies
    });
  });
});
module.exports = router;