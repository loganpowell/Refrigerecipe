CREATE DATABASE IF NOT EXISTS fridgerecipe_dev;
USE fridgerecipe_dev;

/*if the following tables don not exist, remove them before trying to create the tables */
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


/* a fridge has a fridge name, an association a user, and a contents stored as JSON string*/
CREATE TABLE fridges (
id INT NOT NULL AUTO_INCREMENT,
fridge_name varchar(255) NOT NULL,
user_id INT NOT NULL,
ingredients varchar (4096),
PRIMARY KEY(id),
FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
