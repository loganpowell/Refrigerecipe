CREATE DATABASE IF NOT EXISTS fridgerecipe;
USE fridgerecipe;

/*if the following tables don not exist, remove them before trying to create the tables */

/*fridge_content is list of contents in fridges.*/
DROP TABLE IF EXISTS fridge_contents;
/*list of all possible ingredients, users may not exceed the list's content.  This is basically a list of all of world's
possible ingredients*/
DROP TABLE IF EXISTS ingredients;
/*list of fridges.  Fridges is linked to a user (a list of users, in the future), and fridge contains a list of ingredients*/
DROP TABLE IF EXISTS fridges;
/*list of users*/
DROP TABLE IF EXISTS users;



/*create the ingredient table*/
CREATE TABLE users (
id int NOT NULL AUTO_INCREMENT,
username varchar(255) NOT NULL,
email varchar(255) NOT NULL,
password varchar(64),
PRIMARY KEY (id)
);

CREATE TABLE ingredients (
id INT NOT NULL AUTO_INCREMENT,
ingredient_name varchar(255) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE fridges (
id INT NOT NULL AUTO_INCREMENT,
fridge_name varchar(255) NOT NULL,
user_id INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE fridge_contents (
id INT NOT NULL AUTO_INCREMENT,
fridge_id INT,
ingredient_id INT,
servings_count FLOAT DEFAULT 0.0,
PRIMARY KEY(id),
FOREIGN KEY (fridge_id)
	REFERENCES fridges(id)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
FOREIGN KEY (ingredient_id)
	REFERENCES ingredients(id)
	ON UPDATE CASCADE
    ON DELETE CASCADE
)