const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const moviesRoutes = require("./routes/movies");
const usersRoutes = require("./routes/user");

const app = express();


//database connection
mongoose.connect("mongodb+srv://shubham5631:143mpd&Me@cluster0.c2raw.mongodb.net/binzWatch?retryWrites=true&w=majority", {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('connected to database')
    })
    .catch((err) => {
        console.log(err)
        console.log('connection failed');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requsted-With, Content-Type, Accept, Authorization");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
})

app.use("/media", moviesRoutes);
app.use("/user", usersRoutes);
module.exports = app;