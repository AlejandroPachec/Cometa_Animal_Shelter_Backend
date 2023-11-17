CREATE DATABASE IF NOT EXISTS cometa;

USE cometa;

DROP TABLE IF EXISTS experiences_photos, experiences, pet_photos, pets, team;

CREATE TABLE IF NOT EXISTS team (
    team_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    registration_code VARCHAR(36),
    active TINYINT UNSIGNED NOT NULL DEFAULT 0,
    password VARCHAR(100),
    created_at DATETIME NOT NULL DEFAULT NOW()
    );

CREATE TABLE IF NOT EXISTS pets (
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
    created_at DATETIME NOT NULL DEFAULT NOW(),
);

CREATE TABLE IF NOT EXISTS pet_photos (
    photo_id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT,
    photo VARCHAR(60) NOT NULL,
    description TEXT,
    FOREIGN KEY (pet_id) REFERENCES pets(pet_id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS experiences (
		experience_id INT AUTO_INCREMENT PRIMARY KEY,
		title VARCHAR(150) NOT NULL,
		text TEXT NULL,
        adopter_first_name VARCHAR(50),
        adopter_last_name VARCHAR(50),
        pet_name VARCHAR(50),
		created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
		modified_at DATETIME NULL,

);

CREATE TABLE IF NOT EXISTS experiences_photos (
							experience_photo_id INT AUTO_INCREMENT PRIMARY KEY,
							experience_id INT,
							photo VARCHAR(60) NOT NULL,
							description TEXT,
							FOREIGN KEY (experience_id) REFERENCES experiences (experience_id)
									ON DELETE CASCADE
);