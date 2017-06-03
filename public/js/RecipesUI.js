"use strict";

function RecipesUI() {
  this.recipes = [];
  this.recipes_details = {};
}

RecipesUI.prototype.getAllRecipes = function() {

  return new Promise(
    function(resolve, reject) {
      var queryURL = "/recipes.json";
      $.ajax({
        url:queryURL,
        method:"GET"
      })
        .done(function(resp) {
          this.recipesList = resp;
          console.log(resp);
          resolve(resp);
        })
        .fail(function(err) {
          reject(err);
        });
    }
  );

};

RecipesUI.prototype.displayAllRecipes = function(resp) {
  console.log(resp);
  this.recipes = resp;

  var source = $("#recipe-card-template").html();
  var template =Handlebars.compile(source);
  var html = template({"recipes": resp});
  //console.log(html);
  $("#recipes-list-div").append(html);
  $(".popper").click(function(){
    $(this).siblings(".ui.modal.test").modal('show');
  });
  return resp
};

RecipesUI.prototype.setupRecipesModalCards = function() {

  var recipesIdArray = this.recipes.map(function(elem) {return elem.id});
  recipesIdArray = recipesIdArray.slice(0, 2);
  //recipesIdArray = [325270];
  async.everySeries(recipesIdArray, function(elem, callback) {
    console.log(elem);
    var queryURL = "recipes/" + elem;
    $.ajax( {
      url:queryURL,
      method:"GET",
      dataType: 'json'
    })
      .done(function(resp) {
        //console.log(resp);

        callback(null, true);
      })
      .fail(function(err){
        callback(err, false);
      })

  }, function(err, result) {
    //do nothing
    console.log(err);
  });
  //console.log(resp);
};

RecipesUI.prototype.setUpTab = function() {
  $('.menu .item').tab();
};

window.onload = function() {
  window.recipesUI = new RecipesUI();

  window.recipesUI.getAllRecipes()
    .then(window.recipesUI.displayAllRecipes.bind(window.recipesUI))
    .then(window.recipesUI.setupRecipesModalCards.bind(window.recipesUI))
    .then(window.recipesUI.setUpTab);
};

{/* <script>
$(document).ready(function() {
  $(".popper").click(function(){
    $(this).siblings(".ui.modal.test").modal('show');
  });
})
</script> */}
