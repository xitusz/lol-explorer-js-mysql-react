DROP DATABASE IF EXISTS `personal-project-1`;
CREATE DATABASE IF NOT EXISTS `personal-project-1`;

USE `personal-project-1`;

CREATE TABLE IF NOT EXISTS users (
	id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(32) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY `email_un` (email)
);

CREATE TABLE IF NOT EXISTS favorites (
	id INT NOT NULL AUTO_INCREMENT,
	userId INT NOT NULL,
	favorite TEXT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY fk_user (userId) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (id, name, email, password) VALUES
  (1, 'user', 'user@email.com', 'e10adc3949ba59abbe56e057f20f883e'); -- senha: md5('123456')

INSERT INTO favorites (userId, favorite) VALUES
	(1, JSON_ARRAY('Aatrox', 'Ahri', 'Akali'));
