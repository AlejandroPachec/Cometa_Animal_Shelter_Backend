const getPool = require('../../db/connectDB');

async function getAllExperiences (req, res, next) {
  try {
    const pool = await getPool();

    const [experiences] = await pool.query(`SELECT
    e.experience_id,
    e.title,
    e.text,
    e.adopter_first_name,
    e.adopter_last_name,
    e.pet_name,
    e.created_at,
    e.modified_at,
    GROUP_CONCAT(ep.photo) AS experience_photos
FROM
    experiences AS e
LEFT JOIN
    experiences_photos AS ep ON e.experience_id = ep.experience_id
    GROUP BY
e.experience_id,
e.title,
e.text,
e.adopter_first_name,
e.adopter_last_name,
e.pet_name,
e.created_at,
e.modified_at`
    );
    const experiencesWithImages = experiences.map((experience) => {
      const experiencePhotos = experience.experience_photos ? experience.experience_photos.split(',') : [];
      const experienceImageUrls = experiencePhotos.map((photoName) => `${photoName.trim()}`);

      return {
        ...experience,
        experience_photos: experienceImageUrls
      };

    });
    res.status(200).send({
      status: 'Ok',
      message: 'Testimonios disponibles',
      data: {
        experiences: experiencesWithImages
      }

    });

  } catch (error) {
    next(error);
  };

}

module.exports = getAllExperiences;
