"use strict";

function RecipesUI() {
  this.recipes = [];
  //a hash that contains all the information for detailed recipes card, including missed ingredients and used ingredients
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

  async.everySeries(recipesIdArray, function(elem, callback) {
    console.log(elem);
    var queryURL = "recipes/" + elem;
    console.log(this);
    var detailed_recipe_card_source = $('#recipe-modal-detail-template').html();
    var detailed_recipe_card_template = Handlebars.compile(detailed_recipe_card_source);
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
        this.recipes_details[detailed_recipe_card_data.id] = detailed_recipe_card_data;
        console.log(detailed_recipe_card_data);
        var html = detailed_recipe_card_template(detailed_recipe_card_data);

        //update the summary recipe cards with detailed responses.
        var recipe_id = '#' +elem;
        $(recipe_id).find('.modal-detail-card').empty().html(html);
        if(detailed_recipe_card_data["vegetarian"]) {
          $(recipe_id).find('.vegetarian-icon').addClass("leaf")
        }
        $(recipe_id).find('.recipe-external-link').attr('href', detailed_recipe_card_data.sourceUrl);

        //Set up the both summary card and detail card with click handler to put additional content
        //into cart.

        $(recipe_id).find('.add-to-cart-button').click(this.addToCartBtnHander.bind(this));

        //console.log(html);

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

RecipesUI.prototype.addToCartBtnHander = function(event) {
  var recipeId;

  recipeId = $(event.target).closest(".recipe-card").attr('id');
  var ingredients = this.recipes_details[recipeId].missedIngredients;

  ingredients = ingredients.map(function(elem) { return {"ingredient":elem.name, "servings_count": 1}});

  var putData = {
    "ingredients": ingredients,
    "randomData": "Nothing"
  };

  console.log(putData);
  var queryURL = "/cart/add";
  $.ajax({
    url: queryURL,
    method: "PUT",
    contentType:"application/json",
    data: JSON.stringify(putData)
  })
    .done(function (response) {
      console.log(response);

    });

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

