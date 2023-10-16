CREATE DATABASE IF NOT EXISTS cometa;

USE cometa;

DROP TABLE IF EXISTS testimonies, animal_photos, animals, team;

CREATE TABLE IF NOT EXISTS team (
    team_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100)
    );

CREATE TABLE IF NOT EXISTS animals (
    animal_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    species ENUM('Gato', 'Perro') NOT NULL,
    sex ENUM('Macho', 'Hembra', 'Desconocido'),
    weight DECIMAL(5, 2), 
    estimated_birthdate DATE,
    breed VARCHAR(100),
    status ENUM('Buscando', 'En proceso de adopción', 'Adoptado') DEFAULT 'Buscando',
    description TEXT,
    date_added DATE, 
    adoption_date DATE
);

CREATE TABLE IF NOT EXISTS animal_photos (
    photo_id INT AUTO_INCREMENT PRIMARY KEY,
    animal_id INT,
    photo VARCHAR(60) NOT NULL,
    description TEXT,
    FOREIGN KEY (animal_id) REFERENCES animals(animal_id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS testimonies (
		testimony_id INT AUTO_INCREMENT PRIMARY KEY,
		title VARCHAR(150) NOT NULL,
		text TEXT NULL,
        testimony_photo VARCHAR(60),
        adopter_first_name VARCHAR(50),
        adopter_last_name VARCHAR(50),
		created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
		modified_at DATETIME NULL,
		animal_id INT NOT NULL,
		FOREIGN KEY (animal_id) REFERENCES animals(animal_id)
        ON DELETE CASCADE
);