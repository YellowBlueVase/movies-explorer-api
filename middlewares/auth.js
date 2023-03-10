require('dotenv').config();
const jwt = require('jsonwebtoken');
const ERROR_CODE_401 = require('../errors/error401');
const { ERROR_MESSAGE_401 } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ERROR_CODE_401(ERROR_MESSAGE_401);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new ERROR_CODE_401(ERROR_MESSAGE_401));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next(); // пропускаем запрос дальше
};
