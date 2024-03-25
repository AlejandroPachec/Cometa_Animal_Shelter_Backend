const getPool = require('../db/connectDB');
const generateError = require('../helpers/generateError');

const petExists = async (req, res, next) => {
  let pool;

  try {
    const { idPet } = req.params;
    pool = await getPool();

    const [event] = await pool.query(
      `
                SELECT pet_id
                FROM pets
                WHERE pet_id=?
            `,
      [idPet]
    );

    if (!event.length) {
      return next(generateError('No se ha podido encontrar la mascota', 404));
    }

    next();

  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = petExists;
