INSERT INTO users (id, username, email, password) VALUES (1, "Liang", "liang@example.com", null);
INSERT INTO users (id, username, email, password) VALUES (2, "Logan", "logan@example.com", null);
INSERT INTO users (id, username, email, password) VALUES (2, "Sam", "sam@example.com", null);

INSERT INTO ingredients (id, ingredient_name) VALUES (1, "Egg");
INSERT INTO ingredients (id, ingredient_name) VALUES (2, "Beef");
INSERT INTO ingredients (id, ingredient_name) VALUES (3, "Chicken");

INSERT INTO fridges (id, fridge_name, user_id) VALUES(1, "Happy Fridge", 1);
INSERT INTO fridges (id, fridge_name, user_id) VALUES(2, "Bachelor Fridge", 2);
INSERT INTO fridges (id, fridge_name, user_id) VALUES(3, "Sad Fridge", 3);

INSERT INTO fridges (id, fridge_id, ingredient_id, servings_count) VALUES(1, 1, 1, 12);
INSERT INTO fridges (id, fridge_id, ingredient_id, servings_count) VALUES(1, 1, 2, 3.0);
INSERT INTO fridges (id, fridge_id, ingredient_id, servings_count) VALUES(1, 1, 2, 5.2);