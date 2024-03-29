const User = require('../models/User');
const bcrypt = require('bcrypt');
const { getJWT } = require('../utils/auth');
const { uploadProfileImage } = require('../utils/upload');
const fs = require('fs');
const jwt = require('jsonwebtoken')
var crypto = require("crypto");

exports.emailInUse = (req, res) => {
    let { email } = req.query;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.status(200).json({ inUse: true });
      } else {
        res.status(200).json({ inUse: false });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Error checking for emailInUse" }],
      });
    });
};

exports.slugInUse = (req, res) => {
  let { slug } = req.query;

User.findOne({ slug: slug })
  .then((user) => {
    if (user) {
      res.status(200).json({ inUse: true });
    } else {
      res.status(200).json({ inUse: false });
    }
  })
  .catch((err) => {
    res.status(500).json({
      errors: [{ error: "Error checking for slugInUse" }],
    });
  });
};

exports.displayNameInUse = (req, res) => {
    let { displayName } = req.query;

    User.findOne({ 'displayName': displayName })
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

exports.createAccount = (req, res) => {
    let { displayName, email, password } = req.body;
    let profileImage = req.file.path;

    User.findOne({ email: email })
        .then(async user => {
            if (user) {
                return res.status(422).json({ errors: [{ user: "email already exists" }] });
            } else {
                const result = await uploadProfileImage(profileImage);
                fs.unlinkSync(profileImage);

                const id = crypto.randomBytes(3).toString('hex');

                const user = new User({
                    displayName: displayName,
                    email: email,
                    password: password,
                    profileImage: result.url,
                    slug: id,
                    bio: `${displayName} hasn't written a bio yet.`
                });

        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            user.password = hash;

            user
              .save()
              .then((response) => {
                let authToken = getJWT(user._id, user.displayName, user.email, user.profileImage, user.bio, user.slug);

                res.status(200).json({
                  success: true,
                  authToken: authToken,
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
        errors: [{ error: err }],
      });
    });
};

exports.signin = (req, res) => {
  let { email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          errors: [{ email: "No existing account with this email" }],
        });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res
                .status(400)
                .json({ errors: [{ password: "Incorrect password" }] });
            }

            let authToken = getJWT(user._id, user.displayName, user.email, user.profileImage, user.bio, user.slug);

            return res.status(200).json({
              success: true,
              authToken: authToken,
              message: user,
            });
          })
          .catch((err) => {
            res.status(500).json({ errors: err });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ errors: err });
    });
};

exports.validateAuthToken = (req, res) => {
    let { authToken } = req.body;
    try {
        const decoded = jwt.verify(authToken, process.env.TOKEN_SECRET);
        res.status(200).json(decoded);
    } catch (error) {
        res.status(500).json('Error in validateAuthToken')
    }
}

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return next("nulltoken")
  try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;
      next();
  } catch (error) {
      res.sendStatus(403);
  }
}

exports.getProfileImage = async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (!user) {
      return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json({ profileImage: user.profileImage });

}

exports.updateProfileInformation = async (req, res) => {
  const { authToken, displayName, bio, slug } = req.body;

  try {
    const payload = jwt.verify(authToken, process.env.TOKEN_SECRET);

    const filter = { _id: payload._id};
    const update = { 
      displayName,
      bio,
      slug
     };

    const doc = await User.findOneAndUpdate(filter, update, {
      new: true
    });

    let newAuthToken = getJWT(doc._id, doc.displayName, doc.email, doc.profileImage, doc.bio, doc.slug);
    
    res.status(200).json({ newAuthToken, message: "Information successfully updated!" });

  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
}
