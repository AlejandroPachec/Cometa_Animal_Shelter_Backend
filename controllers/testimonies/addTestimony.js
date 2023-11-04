const getPool = require('../../db/connectDB');
const addTestimonySchema = require('../../schema/addTestimonySchema');
const generateError = require('../../helpers/generateError');
const savePhoto = require('../../helpers/savePhoto');
const { photoSchema, arrayPhotoSchema } = require('../../schema/PhotoSchema');

async function addTestimony (req, res, next) {
  try {
    console.log(req.body);
    const insertedPhotos = [];
    let errorSchema;

    const photos = req.files?.photos;

    if (!photos || photos.length === 0) {
      return next(generateError('No has subido ninguna foto de la experiencia', 400));
    }

    if (photos.length > 8) {
      return next(generateError('Has subido demasiadas fotos. Máximo 8', 400));
    }

    if (Array.isArray(photos)) {
      const { error } = await arrayPhotoSchema.validateAsync(photos);
      errorSchema = error;
    } else {
      await photoSchema.validateAsync(photos);
    }

    if (errorSchema) {
      return next(generateError(errorSchema.details[0].message, 400));
    }

    const { error } = addTestimonySchema.validate(req.body);

    if (error) {
      return next(generateError(error.message, 400));
    };

    const pool = await getPool();

    const { title, text, adopterFirstName, adopterLastName, petName } = req.body;

    const [testimonyDescription] = await pool.query(
      'SELECT text FROM testimonies WHERE text = ?',
      [text]
    );
    if (testimonyDescription.length > 0) {
      return next(generateError('Ya existe una experiencia con esa descripción', 400));
    }

    await pool.query(
      'INSERT INTO testimonies(title, text, adopter_first_name, adopter_last_name, pet_name) VALUES (?, ?, ?, ?, ?)',
      [title, text, adopterFirstName, adopterLastName, petName]
    );
    const [insertedId] = await pool.query('SELECT LAST_INSERT_ID() as id');

    if (Array.isArray(photos)) {
      for (const photo of photos) {
        const photoName = await savePhoto(photo, 500);
        await pool.query(
          'INSERT INTO testimonies_photos (testimony_id, photo) VALUES (?, ?)',
          [insertedId[0].id, photoName]
        );

        insertedPhotos.push(photoName);
      }
    } else {
      const photoName = await savePhoto(photos, 500);
      await pool.query(
        'INSERT INTO testimonies_photos (testimony_id, photo) VALUES (?, ?)',
        [insertedId[0].id, photoName]
      );
      insertedPhotos.push(photoName);
    }
    res.status(200).send({
      status: 'Ok',
      message: 'Experiencia agregada correctamente',
      data: {
        testimony_id: insertedId[0].id,
        title,
        text,
        adopterFirstName,
        adopterLastName,
        petName,
        photos: insertedPhotos
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = addTestimony;

