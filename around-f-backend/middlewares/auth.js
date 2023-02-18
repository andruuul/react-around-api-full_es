const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(`Authorization required`);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      'dev-secret',
    );
  } catch (err) {
    throw new AuthError('Authorization required');
  }
  req.user = payload; // asigna el payload al objeto de solicitud
  next(); // envía la solicitud al siguiente middleware
};
