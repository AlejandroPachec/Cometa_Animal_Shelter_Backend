const getPool = require('../../db/connectDB');

async function getAllTestimonies (req, res, next) {
  try {
    const pool = await getPool();

    const [testimonies] = await pool.query(`SELECT
    t.testimony_id,
    t.title,
    t.text,
    t.adopter_first_name,
    t.adopter_last_name,
    t.pet_name,
    t.created_at,
    t.modified_at,
    GROUP_CONCAT(tp.photo) AS testimony_photos
FROM
    testimonies AS t
LEFT JOIN
    testimonies_photos AS tp ON t.testimony_id = tp.testimony_id
    GROUP BY
t.testimony_id,
t.title,
t.text,
t.adopter_first_name,
t.adopter_last_name,
t.pet_name,
t.created_at,
t.modified_at`
    );
    const testimoniesWithImages = testimonies.map((testimony) => {
      const testimonyPhotos = testimony.testimony_photos ? testimony.testimony_photos.split(',') : [];
      const testimonyImageUrls = testimonyPhotos.map((photoName) => `${photoName.trim()}`);

      return {
        ...testimony,
        testimony_photos: testimonyImageUrls
      };

    });
    res.status(200).send({
      status: 'Ok',
      message: 'Testimonios disponibles',
      data: {
        testimonies: testimoniesWithImages
      }

    });

  } catch (error) {
    next(error);
  };

}

module.exports = getAllTestimonies;
