<<<<<<< HEAD
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createJWT = require("../utils/auth");
=======
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
>>>>>>> 3252cd5345e1caf3709386169bab097f9c443f86

exports.signup = (req, res, next) => {
  let { displayName, email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res
          .status(422)
          .json({ errors: [{ user: "email already exists" }] });
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

<<<<<<< HEAD
            user
              .save()
              .then((response) => {
                res.status(200).json({
                  success: true,
                  result: response,
=======
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
>>>>>>> 3252cd5345e1caf3709386169bab097f9c443f86
                });
              })
              .catch((err) => {
                res.status(500).json({
                  errors: [{ error: err }],
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
    });
};

exports.signin = (req, res) => {
  let { email, password } = req.body;

<<<<<<< HEAD
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          errors: [{ user: "not found" }],
        });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res
                .status(400)
                .json({ errors: [{ password: "incorrect" }] });
            }

            let access_token = createJWT(user.email, user._id);

            jwt.verify(
              access_token,
              process.env.TOKEN_SECRET,
              (err, decoded) => {
                if (err) {
                  res.status(500).json({ errors: err });
                }
                if (decoded) {
                  return res.status(200).json({
                    success: true,
                    token: access_token,
                    message: user,
                  });
                }
              }
            );
          })
          .catch((err) => {
=======
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
>>>>>>> 3252cd5345e1caf3709386169bab097f9c443f86
            res.status(500).json({ errors: err });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ errors: err });
    });
};
