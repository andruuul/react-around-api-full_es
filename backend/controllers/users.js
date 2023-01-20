const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
//const dotenv = require('dotenv');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const AuthError = require('../errors/auth-err');
const ConflictError = require('../errors/conflict-err');

function orFailUsers() {
  throw new NotFoundError('Usuario no encontrado');
}

/*
function errorMessagesUsers(err) {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Datos no válidos' });
  } else if (err.name === 'CastError' || err.name === 'TypeError') {
    res.status(404).send({ message: 'Usuario no encontrado' });
  } else if (err.name === 'MongoError') {
    res.status(409).send({ message: 'El usuario ya existe' });
  } else {
    res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
  }
}
*/

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .select('+password')
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(orFailUsers)
    .select('+password')
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.status(201).send({ _id: user._id }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Datos no válidos');
      } else if (err.name === 'MongoError') {
        throw new ConflictError('El usuario ya existe');
      }
      next(err)
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true }) //activar la validación
    .orFail(orFailUsers)
    .select('+password')
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
    .orFail(orFailUsers)
    .select('+password')
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(
          'Datos no válidos'
        );
      }
      next(err)
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Usuario no encontrado');
      } else {
        req._id = user._id;
        return bcrypt.compare(password, user.password);
      }
    })
    .then((matched) => {
      if (!matched) {
        throw new AuthError('Datos incorrectos');
      }
      const token = jwt.sign(
        { _id: req._id },
        'super-secret-password', 
        //NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }
      );
      res.header('authorization', `Bearer ${token}`);
      res.cookie('token', token, { httpOnly: true });
      res.status(200).send({ token });
    })
    .catch(next);
}