const getPool = require('../../db/connectDB');
const deletePhoto = require('../../helpers/deletePhoto');

async function deletePet (req, res, next) {
  try {
    const pool = await getPool();
    const { idPet } = req.params;

    const [photos] = await pool.query(
      `
                SELECT photo
                FROM pet_photos
                WHERE pet_id=?
            `,
      [idPet]
    );

    console.log(req.params);
    if (photos.length > 0) {
      await pool.query('DELETE FROM pet_photos WHERE pet_id=?', [idPet]);

      for (const item of photos) {
        await deletePhoto(item.photo);
      }
    }

    await pool.query('DELETE FROM pets WHERE pet_id=?', [idPet]);

    res.status(200).send({
      status: 'OK',
      message: 'La mascota y sus fotos han sido eliminadas'
    });

  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = deletePet;
