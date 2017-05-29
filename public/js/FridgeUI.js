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
FridgeUI.prototype.getFridgeIngredients = function(id) {
  //assume fridge id always 1 at this point
  var queryURL = "/fridge/1";
  $.ajax( {
    url:queryURL,
    method: "GET"
  })
  .done(function(response) {
    console.log(response);
    this.ingredients = response.ingredients;
    this.fridge_name = response.fridge_name;
    this.id = response.id;
    this.user_id = response.user_id;
  }.bind(this))
};

var getFridgeIngredients = new Promise (
  function(resolve, reject) {
    var queryURL = "/fridge/1";
    $.ajax( {
      url:queryURL,
      method:"GET"
    })
      .done(function(response) {
        resolve(response);
      })

  }
);

var displayFridgeIngredients = function(response) {
  console.log("response: ")
  console.log(response);
};

const doSomething = function() {
  getFridgeIngredients
    .then(displayFridgeIngredients)
    .then(fulfilled => console.log("fulfilled: " + fulfilled))
  .catch(error => console.log(error.message));
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
  //window.fridgeUI.getFridgeIngredients(1);
  //doSomething();
  templatingTest();
};