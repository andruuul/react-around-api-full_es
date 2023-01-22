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
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById({ _id: req.params.id })
    .select('+password')
    .orFail(orFailUsers)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  console.log('registrado 1');
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({ _id: user._id });
      console.log('registrado 2');
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
  console.log('22222');

  User.findOne({ email })
    .select('+password')
    .orFail(orFailUsers)
    .then((user) => {
      console.log('3333');
      req._id = user._id;
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Datos incorrectos');
          }
          return user;
        });
    })
    .then((user) => {
      console.log('4444');
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

module.exports.getUsersMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Not found');
      }
      console.log(user);
      return res.status(200).send({
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => next(err));
};
