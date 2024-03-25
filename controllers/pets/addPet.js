const getPool = require('../../db/connectDB');
const savePhoto = require('../../helpers/savePhoto');
const addPetSchema = require('../../schema/addPetSchema');
const generateError = require('../../helpers/generateError');
const { photoSchema, arrayPhotoSchema } = require('../../schema/photoSchema');

async function addPet (req, res, next) {
  try {
    const insertedPhotos = [];
    const pool = await getPool();

    const photos = req.files?.photo;
    let photoErrorSchema;

    if (!photos || photos.length === 0) {
      return next(generateError('No has subido ninguna foto de la mascota', 400));
    }

    if (photos.length > 400) {
      return next(generateError('Has subido demasiadas fotos. Máximo 400', 400));
    }

    if (Array.isArray(photos)) {
      const { error } = await arrayPhotoSchema.validateAsync(photos);
      photoErrorSchema = error;
    } else {
      await photoSchema.validateAsync(photos);
    }

    if (photoErrorSchema) {
      return next(generateError(photoErrorSchema.details[0].message, 400));
    }

    const { error: petError } = addPetSchema.validate(req.body);

    if (petError) {
      return next(generateError(petError.message, 400));
    }

    const { name, species, sex, weight, estimatedBirthdate, breed, status, description, dateAdded, adoptionDate } = req.body;

    const [newPet] = await pool.query(
      `
                INSERT INTO pets (name, species, sex, weight, estimated_birthdate, breed, status, description, date_added, adoption_date, created_at)
                VALUES (?,?,?,?,?,?,?,?,?,?,DEFAULT)
            `,
      [name, species, sex, weight, estimatedBirthdate, breed, status, description, dateAdded, adoptionDate]
    );

    const { insertId } = newPet;

    if (Array.isArray(photos)) {
      for (const photo of photos) {
        const photoName = await savePhoto(photo);

        await pool.query(
          'INSERT INTO pet_photos (pet_id, photo) VALUES (?, ?)',
          [insertId, photoName]
        );

        insertedPhotos.push(photoName);
      }
    } else {
      const photoName = await savePhoto(photos);
      await pool.query(
        'INSERT INTO pet_photos (pet_id, photo) VALUES (?, ?)',
        [insertId, photoName]
      );
      insertedPhotos.push(photoName);
    }

    res.status(200).send({
      status: 'OK',
      message: 'Mascota creada correctamente',
      data: newPet
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = addPet;

