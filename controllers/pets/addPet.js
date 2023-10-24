const crypto = require('crypto');
const getPool = require('../../db/connectDB');
const addPetSchema = require('../../schema/addPetSchema');
const generateError = require('../../helpers/generateError');
const savePhoto = require('../../helpers/savePhoto');
const { photoSchema, arrayPhotoSchema } = require('../../schema/PhotoSchema');

async function addPet (req, res, next) {
  try {
    const insertedPhotos = [];
    let errorSchema;

    const photos = req.files?.photos;

    if (!photos || photos.length === 0) {
      return next(generateError('No has subido ninguna foto de la mascota', 400));
    }

    if (photos.length > 10) {
      return next(generateError('Has subido demasiadas fotos. Máximo 10', 400));
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

    const { error } = addPetSchema.validate(req.body);

    if (error) {
      return next(generateError(error.message, 400));
    }

    const pool = await getPool();
    const { name, species, sex, weight, estimatedBirthdate, breed, status, description, dateAdded, adoptionDate } = req.body;

    const [petDescription] = await pool.query(
      'SELECT description FROM pets WHERE description = ?',
      [description]
    );
    if (petDescription.length > 0) {
      return next(generateError('Ya existe una mascota con esa descripción', 400));
    }

    await pool.query(
      'INSERT INTO pets(name, species, sex, weight, estimated_birthdate, breed, status, description, date_added, adoption_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, species, sex, weight, estimatedBirthdate, breed, status, description, dateAdded, adoptionDate]
    );
    const [insertedId] = await pool.query('SELECT LAST_INSERT_ID() as id');

    if (Array.isArray(photos)) {
      for (const photo of photos) {
        const photoName = await savePhoto(photo, 500);
        await pool.query(
          'INSERT INTO pet_photos (name, pet_id) VALUES (?, ?)',
          [photoName, insertedId]
        );

        insertedPhotos.push(photoName);
      }
    } else {
      const photoName = await savePhoto(photos, 500);
      await pool.query(
        'INSERT INTO product_photo (id, name, product_id) VALUES (?, ?, ?)',
        [photoName, insertedId]
      );
      insertedPhotos.push(photoName);
    }

    res.status(200).send({
      status: 'Ok',
      message: 'Producto creado correctamente',
      data: {
        pet_id: insertedId[0].id,
        name,
        species,
        sex,
        weight,
        estimatedBirthdate,
        breed,
        status,
        description,
        dateAdded,
        adoptionDate,
        photos: insertedPhotos
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = addPet;
