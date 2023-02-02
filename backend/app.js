const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const validator = require('validator');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

function validateURL(value, helpers) {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors());
app.options('*', cors());

mongoose.connect('mongodb://127.0.0.1/aroundb');

app.use(express.json({ extended: true })); // para parsear application/json
app.use(express.urlencoded({ extended: true })); // para el formato de datos tradicional GET form

app.use(requestLogger);

app.use('/cards', auth, cardsRouter);
app.use('/users', auth, usersRouter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().min(8),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateURL),
      email: Joi.string().required().email(),
      password: Joi.string().min(8),
    }),
  }),
  createUser,
);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? 'Ocurió un error en el servidor' : message,
  });
});

app.listen(PORT, () => {
  console.log(`Link to port: ${PORT}`);
});
