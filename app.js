const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { default: helmet } = require('helmet');
const routerIndex = require('./routes/index');
const centralError = require('./errors/centralError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = require('./middlewares/limiter');
const { CRASH_TEST } = require('./utils/constants');

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

const { PORT = 3000 } = process.env;

const app = express();

const options = {
  origin: [
    'localhost:3001',
    'http://localhost:3001',
    'https://localhost:3001',
    'http://moviepicker.nomoredomains.nomoredomains.work',
    'https://moviepicker.nomoredomains.nomoredomains.work',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
app.use('*', cors(options));

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(limiter);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(CRASH_TEST);
  }, 0);
});
app.use(routerIndex);
app.use(errorLogger);
app.use(errors());
app.use(centralError);

app.listen(PORT, () => {
});
