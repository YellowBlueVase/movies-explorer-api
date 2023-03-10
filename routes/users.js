const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getProfile, updateProfile, login, createUser, logout,
} = require('../controllers/users');
const {
  validateUpdateProfile, validateLogin, validateCreateUser,
} = require('../middlewares/validate');

router.get('/users/me', auth, getProfile);

router.patch('/users/me', auth, validateUpdateProfile, updateProfile);

router.post('/signin', validateLogin, login);

router.post('/signup', validateCreateUser, createUser);

router.post('/signout', auth, logout);

module.exports = router;
