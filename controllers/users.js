require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
// Bad request
const ERROR_CODE_400 = require('../errors/error400');
// Not Found
const ERROR_CODE_404 = require('../errors/error404');
// Conflict
const ERROR_CODE_409 = require('../errors/error409');
const {
  ERROR_MESSAGE_400, ERROR_MESSAGE_409, ERROR_MESSAGE_404, LOGOUT_MESSAGE,
} = require('../utils/constants');

const opts = {
  new: true,
  runValidators: true,
};
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => {
      res.send({
        data: {
          email: user.email,
          name: user.name,
          _id: user._id,
          __v: user.__v,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ERROR_CODE_400(ERROR_MESSAGE_400));
      } else if (err.code === 11000) {
        next(new ERROR_CODE_409(ERROR_MESSAGE_409));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(next);
};

module.exports.getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new ERROR_CODE_404(ERROR_MESSAGE_404);
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    opts,
  )
    .then((user) => {
      if (!user) {
        throw new ERROR_CODE_404(ERROR_MESSAGE_404);
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ERROR_CODE_400(ERROR_MESSAGE_400));
      } else {
        next(err);
      }
    });
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.send({
    message: LOGOUT_MESSAGE,
  });
};
