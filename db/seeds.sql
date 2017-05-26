INSERT INTO users (id, username, email, password) VALUES (1, "Liang", "liang@example.com", null);
INSERT INTO users (id, username, email, password) VALUES (2, "Logan", "logan@example.com", null);
INSERT INTO users (id, username, email, password) VALUES (3, "Sam", "sam@example.com", null);

INSERT INTO ingredients (id, ingredient_name) VALUES (1, "Egg");
INSERT INTO ingredients (id, ingredient_name) VALUES (2, "Beef");
INSERT INTO ingredients (id, ingredient_name) VALUES (3, "Chicken");
INSERT INTO ingredients (id, ingredient_name) VALUES (4, "Milk");

INSERT INTO fridges (id, fridge_name, user_id) VALUES(1, "Happy Fridge", 1);
INSERT INTO fridges (id, fridge_name, user_id) VALUES(2, "Bachelor Fridge", 2);
INSERT INTO fridges (id, fridge_name, user_id) VALUES(3, "Sad Fridge", 3);

INSERT INTO fridge_contents (id, fridge_id, ingredient, servings_count) VALUES(1, 1, "Egg", 12);
INSERT INTO fridge_contents (id, fridge_id, ingredient, servings_count) VALUES(2, 1, "Beef", 3.0);
INSERT INTO fridge_contents (id, fridge_id, ingredient, servings_count) VALUES(3, 1, "Chicken", 5.2);
INSERT INTO fridge_contents (id, fridge_id, ingredient, servings_count) VALUES(4, 1, "Milk", 5.2);