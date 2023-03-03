const router = require('express').Router();
const ERROR_CODE_404 = require('../errors/error404');
const auth = require('../middlewares/auth');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const { ERROR_MESSAGE_404 } = require('../utils/constants');

router.use(routerUsers);
router.use(routerMovies);
router.use('*', auth, (req, res, next) => {
  next(ERROR_CODE_404(ERROR_MESSAGE_404));
});

module.exports = router;
