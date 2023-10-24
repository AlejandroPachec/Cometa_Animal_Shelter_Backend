const jwt = require('jsonwebtoken');
const generateError = require('../helpers/generateError');
const { SECRET } = require('../config');
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return next(generateError('Acceso limitado a miembros del equipo autentificados', 401));
    }

    let tokenInfo;

    try {
      tokenInfo = await jwt.verify(token, SECRET);
    } catch {
      throw generateError('Token incorrecto', 401);
    }

    req.user = tokenInfo;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authUser;
