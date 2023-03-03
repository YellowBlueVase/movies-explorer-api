const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const ERROR_CODE_401 = require('../errors/error401');
const { ERROR_MESSAGE_401, WRONG_EMAIL } = require('../utils/constants');

// Опишем схему:
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: WRONG_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new ERROR_CODE_401(ERROR_MESSAGE_401);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new ERROR_CODE_401(ERROR_MESSAGE_401);
          }
          return user;
        });
    });
};

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
