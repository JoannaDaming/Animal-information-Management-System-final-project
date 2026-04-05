CREATE DATABASE IF NOT EXISTS animal_info_system;
USE animal_info_system;

CREATE TABLE IF NOT EXISTS OWNERS (
    owner_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20),
    email VARCHAR(100),
    address TEXT
);

CREATE TABLE IF NOT EXISTS ANIMALS (
    animal_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50),
    breed VARCHAR(50),
    gender ENUM('Male', 'Female', 'Unknown'),
    birth_date DATE,
    color VARCHAR(50),
    owner_id INT,
    status ENUM('Active', 'Inactive', 'Deceased'),
    FOREIGN KEY (owner_id) REFERENCES OWNERS(owner_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS MEDICAL_RECORDS (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    animal_id INT NOT NULL,
    diagnosis TEXT,
    treatment TEXT,
    record_date DATE,
    FOREIGN KEY (animal_id) REFERENCES ANIMALS(animal_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS APPOINTMENTS (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    animal_id INT NOT NULL,
    owner_id INT NOT NULL,
    appointment_date DATETIME,
    purpose VARCHAR(255),
    status ENUM('Scheduled', 'Completed', 'Cancelled'),
    FOREIGN KEY (animal_id) REFERENCES ANIMALS(animal_id) ON DELETE CASCADE,
    FOREIGN KEY (owner_id) REFERENCES OWNERS(owner_id) ON DELETE CASCADE
);
