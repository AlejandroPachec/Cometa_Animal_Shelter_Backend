const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const getPool = require('../../db/connectDB');
const loginTeamMemberSchema = require('../../schema/loginTeamMemberSchema');
const generateError = require('../../helpers/generateError');
const { SECRET } = require('../../config');

async function loginUser (req, res, next) {
  const { error } = loginTeamMemberSchema.validate(req.body);

  if (error) {
    return next(generateError(error.message, 400));
  }

  try {
    const pool = await getPool();

    const { email, password } = req.body;

    const [teamMemberInfo] = await pool.query(
      'SELECT first_name, last_name, active, team_id FROM team WHERE email = ?;'
      , [email]);

    const [[teamMemberPassword]] = await pool.query(
      'SELECT password from team WHERE email = ?'
      , [email]);

    if (teamMemberInfo.length < 1) {
      return next(generateError('Email y/o contraseña incorrectos', 404));
    }

    const validatePassword = await bcrypt.compare(password, teamMemberPassword.password);

    if (!validatePassword) {
      return next(generateError('Email y/o contraseña incorrectos', 404));
    }

    if (teamMemberInfo[0].active === 0) {
      return next(generateError('Debes activar tu usuario primero. Revisa la bandeja de entrada o spam de tu correo.', 403));
    }

    const payload = {
      id: teamMemberInfo[0].id
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: '365d' });

    res.header({ token });

    res.status(200).send({
      status: 'Ok',
      message: 'Miembr@ logueado correctamente',
      data: {
        teamMemberInfo,
        token
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = loginUser;
