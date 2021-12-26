const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = (req, res) => {
  checkParams(req, res, async () => {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const username = req.body.username;
    const newUser = new User({
      username: username,
      password: encryptedPassword,
    });

    newUser.save((err) => {
      if (err) {
        res.status(401).json({ message: 'Something went wrong' });
      } else {
        const token = generateToken(username);
        res.status(200).json({ message: 'User created', token: token });
      }
    });
  });
};

const loginUser = (req, res) => {
  checkParams(req, res, () => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
        res.status(401).json({ message: 'Something went wrong' });
      } else {
        if (user) {
          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (result) {
              const token = generateToken(user.username);
              return res
                .status(200)
                .json({ message: 'User logged in', token: token });
            }
            res.status(401).json({ message: 'Invalid credentials' });
          });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      }
    });
  });
};

const checkParams = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ message: 'Please provide username and password' });
  }
  next();
};

const generateToken = (username) => {
  const token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  return token;
};

module.exports = { registerUser, loginUser };
