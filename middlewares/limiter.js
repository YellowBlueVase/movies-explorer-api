const rateLimit = require('express-rate-limit');
const { LIMITER_ALERT } = require('../utils/constants');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100,
  message: LIMITER_ALERT,
});
