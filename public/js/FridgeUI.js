function FridgeUI() {
  this.ingredients = [];
  this.fridge_name = "";
  this.user_id = "";
  //todo change this thing
  this.id = 1;
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
  var fridgeId = this.id;
  return new Promise (
    function(resolve, reject) {
      //todo: resolve this id issue.
      var this_id = this.id;
      console.log("Fridge id: " + fridgeId);

      //todo: modify the fridge ID
      var queryURL = "/fridge/" + fridgeId;
      $.ajax( {
        url:queryURL,
        method:"GET"
      })
        .done(function(response) {
          var ingredient_data = _.pick(response, 'ingredients');
          this.ingredients = ingredient_data["ingredients"];
          resolve();
        }.bind(this))
        .fail(function(err) {
          reject(err);
        });
    }.bind(this)
    //use bind this to get make sure all (this) is the FridgeUI object.  Otherwise, this goes all over the place
  );
};

//this function will display FridgeUI object's ingredient data.
FridgeUI.prototype.displayFridgeIngredients = function() {
  //console.log(resp);
  //var ingredient_data = _.pick(resp, 'ingredients');
  //this.ingredients = ingredient_data["ingredients"];
  console.log(this.ingredients);
  //console.log(ingredient_data);
  var source = $("#fridge-ingredient-template").html();
  var template =Handlebars.compile(source);
  var html = template({"ingredients": this.ingredients});
  console.log(html);
  $("#ingredient-list-div").append(html);
};

FridgeUI.prototype.clearFridgeIngredients = function(resp) {
  $("#ingredient-list-div").empty();
};

FridgeUI.NEW_INGREDIENT_ENTRY_ID = '#new_ingredient_entry';
FridgeUI.NEW_INGREDIENT_CHECK_BTN_ID = '#new_ingredient_btn';

FridgeUI.prototype.addNewIngredientBtnClick = function() {
  this.clearFridgeIngredients();

  var ingredient_name = $(FridgeUI.NEW_INGREDIENT_ENTRY_ID).val();
  var newIngredient = {"ingredient": ingredient_name, "servings_count":1};
  this.ingredients.push(newIngredient);
  console.log(ingredient_name);

  this.displayFridgeIngredients();
  this.addIngredientOnOffButton();

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


window.onload = function() {
  window.fridgeUI = new FridgeUI();

  $(FridgeUI.NEW_INGREDIENT_CHECK_BTN_ID).click(window.fridgeUI.addNewIngredientBtnClick.bind(window.fridgeUI));
  //window.fridgeUI.getFridgeIngredients(1);
  window.fridgeUI.getFridgeIngredients()
    .then(window.fridgeUI.displayFridgeIngredients.bind(window.fridgeUI))
    .then(window.fridgeUI.addIngredientOnOffButton);
  //templatingTest();
};