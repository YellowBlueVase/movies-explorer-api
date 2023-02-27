const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getProfile, updateProfile, login, createUser,
} = require('../controllers/users');

router.get('/users/me', auth, getProfile);

router.patch('/users/me', celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().min(2).max(30),
    }).unknown(true),
  },
), auth, updateProfile);

router.post('/signin', celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }).unknown(true),
  },
), login);

router.post('/signup', celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
    }).unknown(true),
  },
), createUser);

module.exports = router;
