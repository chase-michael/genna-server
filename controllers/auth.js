const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getJWT } = require("../utils/auth");

exports.emailInUse = (req, res, next) => {
    let { email } = req.body;

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                res.status(200).json({ inUse: true });
            } else {
                res.status(200).json({ inUse: false });
            }
        }).catch(err => {
            res.status(500).json({
                errors: [{ error: 'Error checking for emailInUse' }]
            });
        })
}

exports.displayNameInUse = (req, res, next) => {
    let { displayName } = req.body;

    User.findOne({ displayName: displayName })
        .then(user => {
            if (user) {
                res.status(200).json({ inUse: true });
            } else {
                res.status(200).json({ inUse: false });
            }
        }).catch(err => {
            res.status(500).json({
                errors: [{ error: 'Error checking for emailInUse' }]
            });
        })
}

exports.signup = (req, res, next) => {
    let { displayName, email, password } = req.body;

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(422).json({ errors: [{ user: "email already exists" }] });
            } else {
                const user = new User({
                    displayName: displayName,
                    email: email,
                    password: password,
                });

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) throw err;
                        user.password = hash;

                        user.save()
                            .then(response => {
                                let authToken = getJWT(
                                    user._id,
                                );

                                res.status(200).json({
                                    success: true,
                                    authToken: authToken,
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    errors: [{ error: err }]
                                });
                            });
                    });
                });
            }
        }).catch(err => {
            res.status(500).json({
                errors: [{ error: 'Something went wrong' }]
            });
        })
}

exports.signin = (req, res) => {
    let { email, password } = req.body;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    errors: [{ email: 'No existing account with this email' }],
                });
            } else {
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            return res.status(400).json({ errors: [{ password: 'Incorrect password' }] });
                        }

                        let authToken = getJWT(
                            user._id,
                        );

                        return res.status(200).json({
                            success: true,
                            authToken: authToken,
                            message: user
                        });
                    }).catch(err => {
                        res.status(500).json({ errors: err });
                    });
            }
        }).catch(err => {
            res.status(500).json({ errors: err });
        });
}
