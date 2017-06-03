function CartUI() {
  this.ingredients = [];
  this.cart_name = "";
  this.user_id = "";
  //todo change this thing
  this.id = 1;
  this.counter = 1;
}

//this function takes the resposne from JSON api /fridge/:id
// and feed it to the next function.
CartUI.prototype.getCartIngredients = function () {
  return new Promise(
    function (resolve, reject) {

      //todo: modify the fridge ID
      var queryURL = "/cart";
      $.ajax({
        url: queryURL,
        method: "GET",
        dataType: 'json'
      })
        .done(function (response) {
          var ingredient_data = _.pick(response, 'ingredients');
          this.ingredients = ingredient_data["ingredients"];
          var newArray = [];
          for (var i = 0; i < this.ingredients.length; i++) {
            this.ingredients[i]['index'] = this.counter;
            this.counter++;
            newArray.push(this.ingredients[i]);
          }
          //this line to get around the weird Object/array problem that comes with ajax.
          this.ingredients = newArray;
          resolve();
        }.bind(this))
        .fail(function (err) {
          reject(err);
        });
    }.bind(this)
    //use bind this to get make sure all (this) is the CartUI object.  Otherwise, this goes all over the place
  );
};

//this function will display CartUI object's ingredient data.
CartUI.prototype.displayCartIngredients = function () {
  //console.log(resp);
  //var ingredient_data = _.pick(resp, 'ingredients');
  //this.ingredients = ingredient_data["ingredients"];
  console.log(this.ingredients);
  //console.log(ingredient_data);
  var source = $("#cart-ingredient-template").html();
  var template = Handlebars.compile(source);
  var html = template({"ingredients": this.ingredients});
  console.log(html);
  $("#ingredient-list-div").append(html);
};

CartUI.prototype.clearFridgeIngredients = function (resp) {
  $("#ingredient-list-div").empty();
};



CartUI.prototype.setRemoveIngredientBtnHandlers = function () {
  $("button.remove_ingredient_button").click(this.removeIngredientBtnHandler.bind(this));
};


CartUI.prototype.removeIngredientBtnHandler = function (event) {
  var eventTarget = $(event.target);
  //console.log(eventTarget);
  var itemEntryAncestor = eventTarget.closest('.item');
  var ingredientIndex = itemEntryAncestor.attr('index');
  ingredientIndex = parseInt(ingredientIndex, 10);
  console.log("ingredientIndex: " + ingredientIndex);
  var indexForRemoval = _.indexOf(this.ingredients, _.findWhere(this.ingredients, {index: ingredientIndex}));
  if (indexForRemoval !== -1) {
    //found the correct element
    this.ingredients.splice(indexForRemoval, 1);
    console.log(this.ingredients);
    itemEntryAncestor.remove();
  }

  this.putCartIngredientsToAPI();
};


CartUI.prototype.putCartIngredientsToAPI = function () {
  //assume fridge id is still 1
  //todo wire up fridge ID, finish this
  var queryURL = "/cart"

  var putDataIngredients = [
    {"ingredient": "Beef Chop", "servings_count": 1},
    {"ingredient": "Salmon", "servings_count": 1},
    {"ingredient": "Bread", "servings_count": 1}
  ];

  // putDataIngredients = this.ingredients.map(
  //   function (elem) {
  //     return _.pick(elem, "ingredient", "servings_count");
  //   });
  var putData = {
    "ingredients": putDataIngredients,
    "cart_name": "Happy Cart"
  };

  $.ajax({
    url: queryURL,
    method: "PUT",
    processData: false,
    contentType: 'application/json',
    data: JSON.stringify(putData)
  })
    .done(function (response) {
      console.log(response);

    });
};


window.onload = function () {
  window.CartUI = new CartUI();

  window.CartUI.getCartIngredients()
    .then(window.CartUI.displayCartIngredients.bind(window.CartUI))
    .then(window.CartUI.setRemoveIngredientBtnHandlers.bind(window.CartUI));

};