const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const AuthError = require('../errors/auth-err');
const ConflictError = require('../errors/conflict-err');

function orFailUsers() {
  throw new NotFoundError('Usuario no encontrado');
}

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .select('+password')
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(orFailUsers)
    .select('+password')
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

module.exports.getUsersMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(orFailUsers)
    .select('+password')
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('El usuario ya existe');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({ _id: user._id, email: user.email });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Datos no válidos');
      } else if (err.name === 'MongoError') {
        throw new ConflictError('El usuario ya existe');
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .select('+password')
    .orFail(orFailUsers)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Datos no válidos');
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .select('+password')
    .orFail(orFailUsers)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(
          'Datos no válidos',
        );
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(orFailUsers)
    .then((user) => {
      if (!user) {
        throw new AuthError('email o contraseña incorrectos');
      }
      req._id = user._id;
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(('email o contraseña incorrectos'));
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign(
        { _id: req._id },
        'dev-secret',
        { expiresIn: '7d' },
      );
      res.header('authorization', `Bearer ${token}`);
      res.cookie('token', token, { httpOnly: true });
      res.status(200).send({ token, name: user.name, email: user.email });
    })
    .catch(next);
};
