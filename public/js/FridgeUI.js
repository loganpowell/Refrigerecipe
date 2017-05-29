function FridgeUI() {
  var ingredients;
  var fridge_name;
  var user_id;
  var id;
}
//example output from ajax query
// Object {id: 1, fridge_name: "Happy Fridge", user_id: 1, ingredients: Array(5)}
// fridge_name
//   :
//   "Happy Fridge"
// id
//   :
//   1
// ingredients
//   :
//   Array(5)
// user_id
//   :
//   1

//this function takes the resposne from JSON api /fridge/:id
// and feed it to the next function.
FridgeUI.prototype.getFridgeIngredients = function () {
  return new Promise (
    function(resolve, reject) {
      //todo: resolve this id issue.
      var this_id = this.id;
      console.log("Fridge id: " + this_id);

      //todo: modify the fridge ID
      var queryURL = "/fridge/1";
      $.ajax( {
        url:queryURL,
        method:"GET"
      })
        .done(function(response) {
          resolve(response);
        })
        .fail(function(err) {
          reject(err);
        });
    }
  );
};

//this function will take the api response data and feed it to
// the handlebars displya
FridgeUI.prototype.displayFridgeIngredients = function(resp) {
  console.log(resp);
  var ingredient_data = _.pick(resp, 'ingredients');
  console.log(ingredient_data);
  var source = $("#fridge-ingredient-template").html();
  var template =Handlebars.compile(source);
  var html = template(ingredient_data);
  console.log(html);
  $("#ingredient-list-div").append(html);

};

FridgeUI.prototype.addIngredientOnOffButton = function() {
  $('.checkbox').checkbox('attach events', '.check.button', 'check');
  $('.checkbox').checkbox('attach events', '.uncheck.button', 'uncheck');
};



FridgeUI.prototype.putFridgeIngredients = function(id, data) {
  //assume fridge id is still 1
  //todo wire up fridge ID, finish this
  var queryURL=  "/fridge/1";
  var putParams = _.pick(data, "fridge_name", "user_id", "ingredients");
  $.ajax( {
    url: queryURL,
    method:"PUT"
  })
};

const templatingTest = function() {
  // var data =
  //   {
  //     items:
  //     [
  //       {item:"shit", servings_count: 2},
  //       {item:"shit2", servings_count: 3}
  //     ]
  // };
  var data = {ingredients: [
    {
      ingredient: "Chicken",
      servings_count: 20
    },
    {
      ingredient: "Eggs",
      servings_count: 2
    }
  ]};


  var source = $("#fridge-ingredient-template").html();
  var template =Handlebars.compile(source);
  var html = template(data);
  console.log(html);
};
window.onload = function() {
  window.fridgeUI = new FridgeUI();
  window.fridgeUI.id = 1;
  //window.fridgeUI.getFridgeIngredients(1);
  window.fridgeUI.getFridgeIngredients()
    .then(window.fridgeUI.displayFridgeIngredients)
    .then(window.fridgeUI.addIngredientOnOffButton);
  //templatingTest();
};