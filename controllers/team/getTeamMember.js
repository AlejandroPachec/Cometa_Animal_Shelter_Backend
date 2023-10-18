const getPool = require('../../db/connectDB');
const generateError = require('../../helpers/generateError');
const Joi = require('joi');

async function getUser (req, res, next) {
  try {
    const { teamId } = req.params;
    const pool = await getPool();

    const teamIdSchema = Joi.number().integer().positive();
    const { error } = teamIdSchema.validate(teamId);

    if (error) {
      return next(generateError('El id de miembr@ del equipo no es válido.', 400));
    }

    const [[teamMember]] = await pool.query(`SELECT first_name, last_name, email, created_at
        FROM team
        WHERE team_id = ?`, [teamId]);

    if (!teamMember) {
      return next(generateError(`Miembr@ con el id ${teamId} inexistente`, 404));
    }

    res.status(200).send({
      status: 'ok',
      data: {
        teamMember
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getUser;
