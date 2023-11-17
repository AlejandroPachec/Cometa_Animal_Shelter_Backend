const getPool = require('../../db/connectDB');
const generateError = require('../../helpers/generateError');
const updatePetStatusSchema = require('../../schema/updatePetStatusSchema');

async function updatePetStatus (req, res, next) {
  try {
    const pool = await getPool();

    const { idPet } = req.params;

    const { status, adoptionDate } = req.body;

    const { error } = updatePetStatusSchema.validate({ status, adoptionDate });

    if (error) {
      return next(generateError(error.message, 400));
    };

    if (status === 'Adoptado' && !adoptionDate) {
      return next(generateError('La fecha de adopción es obligatoria', 400));
    };

    if (status === 'Adoptado' && new Date(adoptionDate) > new Date()) {
      return next(generateError('La fecha de adopción no puede ser posterior a la fecha actual', 400));
    };

    if (status === 'Buscando') {
      await pool.query('UPDATE pets SET adoption_date = NULL WHERE pet_id = ?', [idPet]);
    };

    if (status === 'Adoptado') {
      await pool.query('UPDATE pets SET adoption_date = ? WHERE pet_id = ?', [adoptionDate, idPet]);
    };

    if (status === 'En proceso de adopción') {
      await pool.query('UPDATE pets SET adoption_date = NULL WHERE pet_id = ?', [idPet]);
    }

    await pool.query('UPDATE pets SET status = ? WHERE pet_id = ?', [status, idPet]);

    res.status(200).send({
      status: 'Ok',
      message: 'El estado de la mascota ha sido actualizado correctamente',
      data: {
        idPet,
        status,
        adoptionDate
      }
    });

  } catch (error) {
    next(error);
  }
}

module.exports = updatePetStatus;
