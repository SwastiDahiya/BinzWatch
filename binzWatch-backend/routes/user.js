const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const router = express.Router();


router.post("/signup", (req, res, next) => {
    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
    });
    user.save()
        .then(result => {
            res.status(201).json({
                message: 'User created',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.post("/signin", (req, res, next) => {
    let fetchedUser;
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            const token = jwt.sign({
                    email: fetchedUser.email,
                    userId: fetchedUser._id
                },
                "secret_this_should_be_longer", {
                    expiresIn: "6h"
                }
            );
            res.status(200).json({
                token: token,
                expiresIn: 21600
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            });
        });
});
module.exports = router;