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
    $(this).siblings(".ui.modal.modal-detail-card").modal({detachable: false, observeChanges: true}).modal('show').modal('refresh');
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
    console.log(this);
    $.ajax( {
      url:queryURL,
      method:"GET",
      dataType: 'json'
    })
      .done(function(resp) {

        var detailed_recipe_card_data = resp;

        var initial_recipe = _.find(this.recipes, function(o) {return o.id === elem});
        detailed_recipe_card_data["missedIngredients"] = initial_recipe.missedIngredients;
        detailed_recipe_card_data["missedIngredientCount"] = initial_recipe.missedIngredientCount;
        detailed_recipe_card_data["usedIngredients"] = initial_recipe.usedIngredients;
        detailed_recipe_card_data["usedIngredientCount"] = initial_recipe.usedIngredientCount;
        //ready In minutes and cooking minutes might be missing, in which case, assume 20 and 30 by default.
        console.log(detailed_recipe_card_data);
        callback(null, true);
      }.bind(this))
      .fail(function(err){
        callback(err, false);
      }.bind(this))

  }.bind(this),
    function(err, result) {
      //do nothing
      if(!err) console.log(err);
    }.bind(this)
  );
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
