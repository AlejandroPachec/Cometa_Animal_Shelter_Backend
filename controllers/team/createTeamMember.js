const getPool = require('../../db/connectDB');
const crypto = require('node:crypto');
const bcrypt = require('bcrypt');
const createTeamMemberSchema = require('../../schema/createTeamMemberSchema');
const generateError = require('../../helpers/generateError');
const { PORT } = require('../../config');
const emailVerification = require('../../helpers/emailVerification');
require('dotenv').config();

async function createUser (req, res, next) {
  const { error } = createTeamMemberSchema.validate(req.body);

  if (error) {
    return next(generateError(error.message, 400));
  }

  try {
    const { firstName, lastName, email, password } = req.body;
    const pool = await getPool();

    const [userEmail] = await pool.query('SELECT email FROM team WHERE email = ?', [email]);
    if (userEmail.length > 0) {
      return next(generateError('El email indicado ya está en uso', 400));
    }

    const registrationCode = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO team(first_name, last_name, email, password, registration_code) 
             VALUES (?, ?, ?, ?, ?)`,
      [firstName, lastName, email, hashedPassword, registrationCode]
    );

    const subject = '[Cometa] Completa tu registro';

    const html = `<p>¡Bienvenid@ al equipo ${firstName}! Activa tu usuario en <a href="http://localhost:${PORT}/team/activate/${registrationCode}">este enlace</a></p>`;

    await emailVerification(email, subject, html);

    const [insertedId] = await pool.query('SELECT LAST_INSERT_ID() as id');

    res.status(200).send({
      status: 'Ok',
      message: 'Miembr@ del equipo cread@ correctamente',
      data: {
        user_id: insertedId[0].id,
        firstName,
        lastName,
        email,
        registrationCode
      }
    });
  } catch (error) {
    next(error);
  }
}


module.exports = createUser;
