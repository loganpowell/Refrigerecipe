function FridgeUI() {

}

FridgeUI.prototype.getFridgeIngredients = function(id) {
  //assume fridge id always 1 at this point
  var queryURL = "/fridge/1";
  $.ajax( {
    url:queryURL,
    method: "GET"
  })
  .done(function(response) {
    console.log(response);
  }.bind(this))
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
  window.fridgeUI.getFridgeIngredients(1);
};