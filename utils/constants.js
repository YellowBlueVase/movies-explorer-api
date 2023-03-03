const ERROR_MESSAGE_400 = 'Новый пользователь не создан, проверьте корректность запроса.';
const ERROR_MESSAGE_401 = 'Неправильные почта или пароль, требуется авторизация';
const ERROR_MESSAGE_403 = 'Вы не можете удалить чужую карточку.';
const ERROR_MESSAGE_404 = 'Пользователь по указанному _id не найден.';
const ERROR_MESSAGE_404_PAGE = 'Такая страница не существует, пожалуйста, вернитесь на главную.';
const ERROR_MESSAGE_409 = 'Пользователь с таким email уже существует, войдите или используйте другой email для регистрации.';
const LOGOUT_MESSAGE = 'Вы вышли из аккаунта';
const WRONG_EMAIL = 'Некорректно введен email адрес';
const WRONG_URL = 'Некорректный URL';
const LIMITER_ALERT = 'Слишком много попыток входа - попробуйте через 15 минут';
const CRASH_TEST = 'Сервер сейчас упадёт';

module.exports = {
  ERROR_MESSAGE_400,
  ERROR_MESSAGE_401,
  ERROR_MESSAGE_403,
  ERROR_MESSAGE_404,
  ERROR_MESSAGE_404_PAGE,
  ERROR_MESSAGE_409,
  LOGOUT_MESSAGE,
  WRONG_EMAIL,
  WRONG_URL,
  LIMITER_ALERT,
  CRASH_TEST,
};
