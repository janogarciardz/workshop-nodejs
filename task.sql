CREATE DATABASE task_db;

USE task_db;

CREATE TABLE
  `tasks` (
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `description` text,
    `completed` tinyint(1) DEFAULT '0',
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci