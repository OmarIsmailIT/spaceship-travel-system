CREATE DATABASE spaceship_travel_system;

USE spaceship_travel_system;

CREATE TABLE `spaceship` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL UNIQUE,
    `capacity` INT NOT NULL,
    `launch_date` TIMESTAMP NOT NULL,
    `status` ENUM('Active', 'Inactive', 'Maintenance', 'Decommissioned') NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `crew_members` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `spaceship_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `role` ENUM('Captain', 'First Officer', 'Engineer', 'Pilot', 'Scientist', 'Medical Officer', 'Technician', 'Navigator', 'Communications Officer', 'Security Officer') NOT NULL,
    `experience_level` ENUM('Novice', 'Skilled', 'Expert') NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_spaceship_id` FOREIGN KEY (`spaceship_id`)
        REFERENCES `spaceship` (`id`)
);

CREATE TABLE `mission` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `spaceship_id` INT NOT NULL,
    `destination` VARCHAR(255) NOT NULL,
    `launch_date` TIMESTAMP NOT NULL,
    `duration` INT NOT NULL, -- the duration will be in minutes
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_mission_spaceship_id` FOREIGN KEY (`spaceship_id`)
        REFERENCES `spaceship` (`id`)
);

