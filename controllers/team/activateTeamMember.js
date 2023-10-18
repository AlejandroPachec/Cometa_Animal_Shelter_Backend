const Joi = require('joi');
const generateError = require('../../helpers/generateError');
const getPool = require('../../db/connectDB');

async function activateTeamMember (req, res, next) {
  const registrationCodeSchema = Joi.string().uuid().required();

  let registrationCode;

  try {
    registrationCode = await registrationCodeSchema.validateAsync(req.params.registrationCode);
  } catch (error) {
    return next(generateError('El código de activación no es válido', 400));
  }

  try {
    const pool = await getPool();

    const [[idUser]] = await pool.query('SELECT team_id FROM team WHERE registration_code = ?', [registrationCode]);

    if (!idUser) {
      return next(generateError('El miembro del equipo que intenta activar no existe', 404));
    }

    await pool.query(`
        UPDATE team 
        SET registration_code = null,
        active = true
        WHERE registration_code = ?`
    , [registrationCode]);

  } catch (error) {
    next(error);
  }

  res.status(200).send({
    status: 'ok',
    message: 'Miembr@ activad@ correctamente'
  });
};

module.exports = activateTeamMember;
