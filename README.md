# Refrigerecipe
find out what you can cook based on what you got in the fridge.


Idea:



![Wireframe](https://lh3.googleusercontent.com/49XTD17ySAdVfNzfrsMoiB8foVfg7fAQEVLXyHnxUwcR4bsEGDM3DqB6uwSWiu0_5Of-cXIqcKFF16ac9EmtyjQiIxxex7traL-QvSnsC6DpurvaH3SYGP1Y8J7HfBNMug3j0FREUXVrb7JPB60KrFCYrGTTYcgjurgvF7lpePdIM559MK09HubJeISdm9IFalnwp59EceGBzzz5ChMCqxrv1LRCO0-qVMkDj1GJy4Ubxc_LrBGaAoAjdN__n8ca5GTV2V4vd1KZ8lEiSPUgn8w8FzqBwdv5H7kKBVeqnvBFRVK-5PYK9MqODDX3DLv1XDje7iqwmE5iEsDtnNnR3i2m6Bpf1P_7kotkPM5hgGBMbYMghGhn6Tkv_kithw6ei8vnUn4PxrQPPdR-gZe8jHA-rSNTrBl6N_wNmhqeuekZETio3g_MFZKzGh9ttsy0ffoEz1CdZIkqdy0NxK7O0XgZ5StyKLaYefbY7sIjYhB9upcbdX29YNujWHQ_SAceuUfvvJa83Q6fIZEZ_4a62pcE70efVlfIEOrjbp9dQ5A0AY-FVgknwM1TpYt_hlv0o8IffWv97jsdLWjHAXl6RP-8SZpGKMWemDigLEVfcg5fJhUcq_MOzt2YNn86DZxhKJ3gYanonxPG6PAppEgyUjjiEEB-CKmWqyvV-P4TnD8=w800-h600-no "Customer journey and wireframe")

An app for singles, couples and - mostly bachelors... 
1) You inventory what's in the fridge
2) The app takes the inventory and searches through a database or API of recipes to find a selection which require little or no purchases of additional ingredients
3)  you choose the recipe you want and it gives you a shopping list
4) you can either send the shopping list to instacart or to yourself via SMS at a future time (reminder)

Requirements:
* Node/Express: done.
  * GETs: recipes, ingredients
  * Post: fridge ingredients, needed ingredients, ?
  
* New packages: 
  * peapod 
  * google calendar

* Mysql database (-v 0.1)
  * Structure:
    * users: userid, password (should be the same as peadpod)
    * userfood id: userid, foodid, userhas
    * ingredients ingredientid, ingredientname
    * userecipeid, userid(fk), recipeid(fk) (if we save recipes)
    * recipeid, recipeurl, recipename (if we save recipes)
  
* Interfaces required:
  * login/create account
  * view/edit fridge ingredients
  * view recipes/ingredients/missing ingredients (possbily with identified missing ingredients?)
  * (would we need an interface for missing ingredients if we sent them to peapod?  Maybe.)
 
 * SEO note:  Shawn: look into google mobile recipe data structure and schema.org possibilities.
