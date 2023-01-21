const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const AuthError = require('../errors/auth-err');

dotenv.config();
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Authorization Required');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
      payload = jwt.verify(
        token,
        'super-secret-password'
        //NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
      );
  } catch (err) {
        throw new AuthError('Authorization Required');
  }
  req.user = payload; // asigna el payload al objeto de solicitud
  next(); // envía la solicitud al siguiente middleware
};
