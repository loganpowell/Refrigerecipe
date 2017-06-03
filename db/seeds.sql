INSERT INTO users (id, username, email, password) VALUES (1, "Liang", "liang@example.com", null);
INSERT INTO users (id, username, email, password) VALUES (2, "Logan", "logan@example.com", null);
INSERT INTO users (id, username, email, password) VALUES (3, "Sam", "sam@example.com", null);


INSERT INTO fridges (id, fridge_name, user_id, ingredients) VALUES(1, "Happy Fridge", 1, '[{"ingredient":"Egg","servings_count":12},{"ingredient":"Beef","servings_count":3},{"ingredient":"Chicken","servings_count":5.2},{"ingredient":"Milk","servings_count":5.2},{"ingredient":"Honey","servings_count":6.5}]');
INSERT INTO fridges (id, fridge_name, user_id, ingredients) VALUES(2, "Bachelor Fridge", 2, "[]");
INSERT INTO fridges (id, fridge_name, user_id, ingredients) VALUES(3, "Sad Fridge", 3, "[]");


INSERT INTO carts (id, cart_name, user_id, ingredients) VALUES(1, "Happy Fridge", 1, '[{"ingredient":"Beef","servings_count":3}]');
INSERT INTO carts (id, cart_name, user_id, ingredients) VALUES(2, "Bachelor Fridge", 2, "[]");
INSERT INTO carts (id, cart_name, user_id, ingredients) VALUES(3, "Sad Fridge", 3, "[]");