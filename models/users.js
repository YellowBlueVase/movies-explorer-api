const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const ERROR_CODE_401 = require('../errors/error401');

// Опишем схему:
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Некорректно введен Email-адрес',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = (email, password) => this.findOne({ email }).select('+password')
  .then((user) => {
    if (!user) {
      throw new ERROR_CODE_401('Неправильные почта или пароль');
    }
    return bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new ERROR_CODE_401('Неправильные почта или пароль');
        }
        return user;
      });
  });

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
