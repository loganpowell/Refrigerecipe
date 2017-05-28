function FridgeUI() {

}

FridgeUI.prototype.getFridgeContents = function(id) {
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


window.onload = function() {
  window.fridgeUI = new FridgeUI();
  window.fridgeUI.getFridgeContents(1);
};