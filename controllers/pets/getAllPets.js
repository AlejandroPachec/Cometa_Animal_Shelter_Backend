const getPool = require('../../db/connectDB');

async function getAllPets (req, res, next) {
  try {
    const pool = await getPool();

    const conditions = [];
    const weightRange = [];
    const ageRange = [];

    const speciesFilter = req.query?.species;
    const nameFilter = req.query?.name;
    const weightFilter = req.query?.weight;
    const ageFilter = req.query?.age;

    let query = `
        SELECT
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
            pet_photos AS pp ON p.pet_id = pp.pet_id`;

    if (speciesFilter) {
      conditions.push('p.species = ?');
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
    p.breed,
    p.status,
    p.description,
    p.date_added,
    p.adoption_date,
    p.created_at,
    age`;

    if (ageFilter) {
      const [minAge, maxAge] = ageFilter.split('-');
      query += ` HAVING age BETWEEN ${minAge} AND ${maxAge}`;
      ageRange.push(minAge);
      ageRange.push(maxAge);
    }

    const nameFilterValue = nameFilter ? `%${nameFilter}%` : null;
    const params = [speciesFilter, nameFilterValue, ageRange, weightRange].filter((value) => value !== undefined && value !== null);

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


