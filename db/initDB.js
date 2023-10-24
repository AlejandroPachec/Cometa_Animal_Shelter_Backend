const getPool = require('./connectDB');

async function createDB () {
  try {
    const pool = await getPool();

    await pool.query('CREATE DATABASE IF NOT EXISTS cometa;');
    await pool.query('USE cometa;');

    await pool.query(
      'DROP TABLE IF EXISTS  testimonies, pet_photos, pets, team;'
    );

    await pool.query(`CREATE TABLE IF NOT EXISTS team (
					team_id INT AUTO_INCREMENT PRIMARY KEY,
    			first_name VARCHAR(100) NOT NULL,
    			last_name VARCHAR(100) NOT NULL,
    			email VARCHAR(100) NOT NULL UNIQUE,
    			registration_code VARCHAR(36),
    			active TINYINT UNSIGNED NOT NULL DEFAULT 0,
    			password VARCHAR(100),
					created_at DATETIME NOT NULL DEFAULT NOW()
					);`);

    await pool.query(`CREATE TABLE IF NOT EXISTS pets (
					pet_id INT AUTO_INCREMENT PRIMARY KEY,
					name VARCHAR(50) NOT NULL,
					species ENUM('Gato', 'Perro', 'Otros') NOT NULL,
					sex ENUM('Macho', 'Hembra', 'Desconocido'),
					weight DECIMAL(5, 2), 
					estimated_birthdate DATE,
					breed VARCHAR(100),
					status ENUM('Buscando', 'En proceso de adopción', 'Adoptado') DEFAULT 'Buscando',
					description TEXT,
					date_added DATE, 
					adoption_date DATE,
					created_at DATETIME NOT NULL DEFAULT NOW()
			);`);

    await pool.query(`CREATE TABLE IF NOT EXISTS pet_photos (
					photo_id INT AUTO_INCREMENT PRIMARY KEY,
					pet_id INT,
					photo VARCHAR(60) NOT NULL,
					description TEXT,
					FOREIGN KEY (pet_id) REFERENCES pets(pet_id)
							ON DELETE CASCADE
			);`);

    await pool.query(`CREATE TABLE IF NOT EXISTS testimonies (
					testimony_id INT AUTO_INCREMENT PRIMARY KEY,
					title VARCHAR(150) NOT NULL,
					text TEXT NULL,
							testimony_photo VARCHAR(60),
							adopter_first_name VARCHAR(50),
							adopter_last_name VARCHAR(50),
					created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
					modified_at DATETIME NULL,
					pet_id INT NOT NULL,
					FOREIGN KEY (pet_id) REFERENCES pets(pet_id)
							ON DELETE CASCADE
			);`);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

createDB();
