
const getPool = require('./connectDB');

async function backUpDB () {

  const pool = await getPool();

  try {
    await pool.query(`INSERT INTO team (first_name, last_name, email, active) VALUES
        ('Iria', 'Gómez', 'iria_gomez@example.com', 0),
        ('Nuria', 'Perales', 'nuria_perales@example.com', 0);
    `);

    await pool.query(`INSERT INTO pets (name, species, sex, weight, estimated_birthdate, breed, status, description, date_added, adoption_date) VALUES
        ('Fluffy', 'Gato', 'Hembra', 4.5, '2021-02-15', 'Tabby', 'En proceso de adopción', 'A cute and playful tabby cat.', '2023-01-15', '2023-01-21'),
        ('Buddy', 'Perro', 'Macho', 25.5, '2020-05-10', 'Golden Retriever', 'En proceso de adopción', 'A friendly golden retriever.', '2023-02-10', '2023-01-21'),
        ('Luna', 'Gato', 'Hembra', 3.2, '2022-07-10', 'Siamese', 'En proceso de adopción', 'Una gata siamesa cariñosa y juguetona.', '2023-03-05', '2023-03-15'),
    ('Rocky', 'Perro', 'Macho', 18.7, '2019-11-25', 'Labrador Retriever', 'En proceso de adopción', 'Un labrador retriever enérgico y amigable.', '2023-03-12', '2023-03-18'),
    ('Oreo', 'Gato', 'Macho', 5.0, '2022-03-20', 'Tuxedo', 'En proceso de adopción', 'Un gato tuxedo juguetón y sociable.', '2023-04-02', '2023-04-10'),
    ('Bella', 'Perro', 'Hembra', 12.1, '2020-08-15', 'Dachshund', 'En proceso de adopción', 'Una dachshund encantadora y leal.', '2023-04-05', '2023-04-15');
    `);

    await pool.query(`INSERT INTO pet_photos (pet_id, photo, description) VALUES
        (1, 'fluffy1.jpg', 'Fluffy playing with a toy'),
        (1, 'fluffy2.jpg', 'Fluffy sleeping peacefully'),
        (2, 'buddy1.jpg', 'Buddy fetching a ball');
    `);

    await pool.query(`INSERT INTO experiences (title, text, experience_photo, adopter_first_name, adopter_last_name, pet_id)
        VALUES
            ('Una Experiencia de Amor', 'Adoptamos a nuestro amigo peludo de este refugio, y ha sido un viaje increíble. Nuestra nueva mascota ha traído tanta alegría a nuestras vidas.', 'testimonio1.jpg', 'Juan', 'Pérez', 1),
            ('Amor Incondicional', 'No puedo expresar cuánto adoramos a nuestra mascota adoptada. Es el compañero más cariñoso y leal que uno podría desear.', 'testimonio2.jpg', 'María', 'González', 2),
            ('La Mejor Decisión', 'Adoptar a nuestra mascota de este refugio fue la mejor decisión que hemos tomado. El personal fue muy amable, y nuestra mascota es una verdadera bendición.', 'testimonio3.jpg', 'Luis', 'Fernández', 3),
            ('Mi Miembro de la Familia Peludo', 'Nuestra mascota adoptada se ha convertido en una parte integral de nuestra familia. Estamos agradecidos por la oportunidad de darles un hogar lleno de amor.', 'testimonio4.jpg', 'Ana', 'López', 4),
            ('Eternamente Agradecidos', 'Estaremos eternamente agradecidos a este refugio por conectarnos con nuestra adorable mascota. ¡No podemos imaginar la vida sin ellos!', 'testimonio5.jpg', 'Roberto', 'Sánchez', 5);        
    `);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

backUpDB();
