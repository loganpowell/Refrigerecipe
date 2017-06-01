function RecipesUI() {
  var recipesList = [];
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
  var recipes = {"recipes": resp};
  var source = $("#recipe-card-template").html();
  var template =Handlebars.compile(source);
  var html = template(recipes);
  console.log(html);
  $("#recipes-list-div").append(html);
  $(".popper").click(function(){
    $(this).siblings(".ui.modal.test").modal('show');
  });
};

RecipesUI.prototype.setUpTab = function() {
  $('.menu .item').tab();
};

window.onload = function() {
  window.recipesUI = new RecipesUI();

  window.recipesUI.getAllRecipes()
    .then(window.recipesUI.displayAllRecipes)
    .then(window.recipesUI.setUpTab);
};

{/* <script>
$(document).ready(function() {
  $("#test").click(function(){
    $(this).siblings().modal('show');
  });
})
</script> */}
