const getPool = require('../../db/connectDB');
require('dotenv').config();
const generateError = require('../../helpers/generateError');

async function getPet (req, res, next) {
  try {
    const pool = await getPool();
    const { idPet } = req.params;

    const [petInfo] = await pool.query(
      `SELECT
      p.pet_id,
      p.name,
      p.species,
      p.sex,
      p.weight,
      STR_TO_DATE(p.estimated_birthdate, '%Y-%m-%d') AS birthdate,
      p.breed,
      p.status,
      p.description,
      p.date_added,
      p.adoption_date,
      p.created_at,
      GROUP_CONCAT(pp.photo) AS pet_photos,
      DATEDIFF(CURDATE(), p.estimated_birthdate)/365 AS age
        FROM
      pets AS p
        LEFT JOIN
      pet_photos AS pp ON p.pet_id = pp.pet_id
            WHERE
                p.pet_id = ?
            GROUP BY
                p.pet_id, pp.photo
    `, [idPet]);

    const [petPhotos] = await pool.query(
      'SELECT photo FROM pet_photos WHERE pet_id = ?', [idPet]
    );

    if (petInfo.length === 0) {
      return next(generateError('La mascota que buscas no existe', 400));
    };

    const petImages = petPhotos.map((photo) => ({
      url: `${photo.photo}`
    }));

    const pet = {
      id: petInfo[0].pet_id,
      name: petInfo[0].name,
      species: petInfo[0].species,
      sex: petInfo[0].sex,
      weight: petInfo[0].weight,
      birthdate: petInfo[0].birthdate,
      breed: petInfo[0].breed,
      status: petInfo[0].status,
      description: petInfo[0].description,
      adoption_date: petInfo[0].adoption_date,
      age: petInfo[0].age
    };

    res.status(200).send({
      status: 'Ok',
      message: 'Mascota encontrada',
      data: {
        pet,
        petImages
      }
    });

  } catch (error) {
    next(error);
  }
}

module.exports = getPet;
