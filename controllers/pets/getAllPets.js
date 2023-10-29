const getPool = require('../../db/connectDB');
//! COMPROBAR FILTROS. SIN FILTROS FUNCIONA
async function getAllPets (req, res, next) {
  try {
    const pool = await getPool();

    const conditions = [];
    const weightRange = [];

    const speciesFilter = req.query?.species;
    const ageFilter = req.query?.age;
    const nameFilter = req.query?.name;
    const weightFilter = req.query?.weight;

    let query = `
        SELECT
            p.pet_id,
            p.name,
            p.species,
            p.sex,
            p.weight,
            p.estimated_birthdate,
            p.breed,
            p.status,
            p.description,
            p.date_added,
            p.adoption_date,
            p.created_at,
            GROUP_CONCAT(pp.photo) AS pet_photos 
        FROM
            pets AS p
        LEFT JOIN
            pet_photos AS pp ON p.pet_id = pp.pet_id`;

    if (speciesFilter) {
      conditions.push('p.species = ?');
    }

    if (ageFilter) {
      const [minAge, maxAge] = weightFilter.split('-');
      conditions.push(`p.weight BETWEEN ${minAge} AND ${maxAge}`);
      weightRange.push(minAge);
      weightRange.push(maxAge);
    }

    if (nameFilter) {
      conditions.push('p.name LIKE ?');
    }

    if (weightFilter) {
      const [minWeight, maxWeight] = weightFilter.split('-');
      conditions.push(`p.weight BETWEEN ${minWeight} AND ${maxWeight}`);
      weightRange.push(minWeight);
      weightRange.push(maxWeight);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += `
        GROUP BY
        p.pet_id,
        p.name,
        p.species,
        p.sex,
        p.weight,
        p.estimated_birthdate,
        p.breed,
        p.status,
        p.description,
        p.date_added,
        p.adoption_date,
        p.created_at`;

    const nameFilterValue = nameFilter ? `%${nameFilter}%` : null;
    const params = [speciesFilter, ageFilter, nameFilterValue, weightRange].filter(value => value !== undefined);

    const [pets] = await pool.query(query, params);


    const petsWithImages = pets.map((pet) => {
      const petPhotos = pet.pet_photos ? pet.pet_photos.split(',') : [];
      const petImageUrls = petPhotos.map((photoName) => `${photoName.trim()}`);

      return {
        ...pet,
        pet_photos: petImageUrls
      };
    });

    res.status(200).send({
      status: 'Ok',
      message: 'Mascotas disponibles',
      data: petsWithImages
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getAllPets;
