const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const checkAuth = require("../middleware/check-auth");

router.post("/addMovie", checkAuth, (req, res, next) => {
    console.log('heyy')
    const movies = req.body;
    const movie = new Movie({
        title: req.body.movieTitle,
        posterUrl: req.body.moviePosterLink,
        mediaUrl: req.body.movieMediaUrl,
        type: req.body.movieType
    });
    console.log(movie);
    movie.save();
    res.status(201).json({
        message: 'Movie added successfully !'
    })
})
router.get("/movies", (req, res, next) => {
    Movie.find().then((movies) => {
        res.status(200).json({
            message: 'Movies fetched successfully !',
            movies: movies
        });
    });
});

module.exports = router;