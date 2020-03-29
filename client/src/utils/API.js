import axios from "axios";

const SPOONACULAR_API = (url, params = {}) => {
  console.log({ url, params });
  return axios({
    method: "GET",
    url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com" + url,
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-key": "79cdd77d2emsh1fcd47944c92478p11ac47jsn27dbe9aa5a72",
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
    },
    params: { ...params }
  });
};

export default {
  //Spoonacular API
  //for more: https://rapidapi.com/spoonacular/api/recipe-food-nutrition?endpoint=596be52ee4b03e024df91f68

  getQuickAnswer: query =>
    SPOONACULAR_API("/recipes/quickAnswer", { q: query }),

  getSummarizeRecipe: id => SPOONACULAR_API(`/recipes/${id}/summary`),

  getVisualizeMenuItemNutrition: id =>
    SPOONACULAR_API(`/food/menuItems/${id}/nutritionWidget`), //headers may require: "accept":"text/html"

  getVisialuzeRecipeNutritionById: id =>
    SPOONACULAR_API(`/recipes/${id}/nutritionWidget`),

  getMatchRecipesToDailyCalories: (targetCalories = 2000, timeFrame = "day") =>
    SPOONACULAR_API("/recipes/mealplans/generate", {
      targetCalories,
      timeFrame
    }),

  // NOTE: optionalParameters are always objects that have one or more parameters that can be used. Only pass in as object with correct key:value pairs.
  getGenerateMealPlan: optionalParameters =>
    SPOONACULAR_API("/recipes/mealplans/generate", { ...optionalParameters }),
  /* optionalParameters
    { timeFrame: STRING, Either for one 'day' or an entire 'week'.
      targetCalories: NUMBER, What is the caloric target for one day? The meal plan generator will try to get as close as possible to that goal.
      diet: STRING, Enter a diet that the meal plan has to adhere to, e.g. "vegetarian", "vegan", "paleo" etc.
      exclude: STRING, A comma-separated list of allergens or ingredients that must be excluded. }*/

  getRecipeInformationBulk: (idsArray = [], includeNutrition = false) =>
    SPOONACULAR_API("/recipes/informationBulk", {
      includeNutrition,
      ids: idsArray.join("%")
    }),
  /* idsArray:
    ids: ARRAY of numbers REQUIRED

    Optional Parameters:
    { includeNutrition: BOOLEAN, Include nutrition data to the recipe information. } */

  getSearchRecipes: ({ query }, optionalParameters) =>
    SPOONACULAR_API("/recipes/search", { query, ...optionalParameters }),
  /* optionalParameters: 
    { cuisine: STRING,  The cuisine(s) of the recipes. One or more (comma separated) of the following: african, chinese, japanese, korean, vietnamese, thai, indian, british, irish, french, italian, mexican, spanish, middle eastern, jewish, american, cajun, southern, greek, german, nordic, eastern european, caribbean, or latin american.
      diet: STRING, The diet to which the recipes must be compliant. Possible values are: pescetarian, lacto vegetarian, ovo vegetarian, vegan, and vegetarian.
      excludeIngredients: STRING, An comma-separated list of ingredients or ingredient types that must not be contained in the recipes.
      intolerances: STRING A comma-separated list of intolerances. All found recipes must not have ingredients that could cause problems for people with one of the given tolerances. Possible values are: dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat.
      number: NUMBER, The number of results to return (between 0 and 100).
      offset: NUMBER, The number of results to skip (between 0 and 900).
      type: STRING, The type of the recipes. One of the following: main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink.
      limitLicense: BOOLEAN, Whether the recipes should have an open license that allows for displaying with proper attribution.
      instructionsRequired: BOOLEAN Whether the recipes must have instructions. } */

  getSearchRecipesByIngredients: (ingredients, optionalParameters) =>
    SPOONACULAR_API("/recipes/findByIngredients", {
      ingredients,
      ...optionalParameters
    }),
  /* optionalParameters
    { number: NUMBER The maximal number of recipes to return (default = 5).
      limitLicense: BOOLEAN, Whether to only show recipes with an attribution license.
      ranking: NUMBER, Whether to maximize used ingredients (1) or minimize missing ingredients (2) first.
      ignorePantry: BOOLEAN Whether to ignore pantry ingredients such as water, salt, flour etc..} */

  getSimilarRecipes: id => SPOONACULAR_API(`/recipes/${id}/similar`),

  getExtractRecipeFromWebsite: url =>
    SPOONACULAR_API("/recipes/extract", { url }),

  getSearchGroceryProducts: ({ query }, optionalParameters) =>
    SPOONACULAR_API("/food/products/search", { query, ...optionalParameters }),
  /* optional parameters:
    { offset: NUMBER, The number of results to skip, defaults to 0.
      number: NUMBER, The number of results to retrieve, defaults to 10.
      maxCalories: NUMBER The maximum number of calories the product can have.
      minProtein: NUMBER The minimum number of grams of protein the product can have.
      maxProtein: NUMBER The maximum number of grams of protein the product can have.
      minFat: NUMBER, The minimum number of grams of fat the product can have.
      maxFat: NUMBER, The maximum number of grams of fat the product can have.
      minCarbs: NUMBER, The minimum number of grams of carbs the product can have.
      maxCarbs: NUMBER, The maximum number of grams of carbs the product can have.
      minCalories: NUMBER, The minimum number of calories the product can have. } */

  getAutocompleteIngredientsSearch: ({ query }, optionalParameters) =>
    SPOONACULAR_API("/food/ingredients/autocomplete", {
      query,
      ...optionalParameters
    }),
  /* optionalParameters:
    { number: NUMBER, The number of results to return, between [1,100]
      metaInformation: BOOLEAN, Whether to return more meta information about the ingredients.
      intolerances: STRING, A comma-separated list of intolerances. 
      All found ingredients must not cause problems for people with one of the given tolerances. 
      Possible values are: dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat. }  */

  getSearchRecipesComplex: (requiredParameters, optionalParameters) =>
    SPOONACULAR_API("/recipes/searchComplex", {
      ...requiredParameters,
      ...optionalParameters
    }),
  /* requiredParameters: {
      limitLicense: BOOLEAN, Whether the recipes should have an open license that allows for displaying with proper attribution.
      offset: NUMBER, The number of results to skip (between 0 and 900).
      number: NUMBER, The number of results to return (between 1 and 100).
    }
    optionalParameters: {
    query: STRING, The recipe search query.
    cuisine: STRING, The cuisine(s) of the recipes. One or more (comma separated) of the following: african, chinese, japanese, korean, vietnamese, thai, indian, british, irish, french, italian, mexican, spanish, middle eastern, jewish, american, cajun, southern, greek, german, nordic, eastern european, caribbean, or latin american.
    diet: STRING, The diet to which the recipes must be compliant. Possible values are: pescetarian, lacto vegetarian, ovo vegetarian, vegan, paleo, primal, and vegetarian.
    includeIngredients: STRING, A comma-separated list of ingredients that should/must be contained in the recipe.
    excludeIngredients: STRING, An comma-separated list of ingredients that must not be contained in the recipes.
    intolerances: STRING, A comma-separated list of intolerances. All found recipes must not have ingredients that could cause problems for people with one of the given tolerances. Possible values are: dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat.
    type: STRING, The type of the recipes. One of the following: main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink.
    ranking: NUMBER, Whether to minimize missing ingredients (0), maximize used ingredients (1) first, or rank recipes by relevance (2).
    minCalories: NUMBER, The minimum number of calories the recipe must have.
    maxCalories: NUMBER, The maximum number of calories the recipe can have.
    minFat: NUMBER, The minimum number of grams of fat the recipe must have.
    maxFat: NUMBER, The maximum number of grams of fat the recipe can have.
    minProtein: NUMBER, The minimum number of grams of protein the recipe must have.
    maxProtein: NUMBER, The maximum number of grams of protein the recipe can have.
    minCarbs: NUMBER, The minimum number of grams of carbohydrates the recipe must have.
    maxCarbs: NUMBER, The maximum number of grams of carbohydrates the recipe can have.
    fillIngredients: BOOLEAN, Add information about the used and missing ingredients in each recipe.
    instructionsRequired: BOOLEAN, Whether the recipes must have instructions.
    addRecipeInformation: BOOLEAN, If set to true, you get more information about the recipes returned. This saves the calls to get recipe information.
    minAlcohol: NUMBER, The minimum number of grams of alcohol the recipe must have.
    maxAlcohol: NUMBER, The maximum number of grams of alcohol the recipe can have.
    minCaffeine: NUMBER, The minimum number of milligrams of caffeine the recipe must have.
    maxCaffeine: NUMBER, The maximum number of milligrams of caffeine the recipe can have.
    minCopper: NUMBER, The minimum number of milligrams of copper the recipe must have.
    maxCopper: NUMBER, The maximum number of milligrams of copper the recipe can have.
    minCalcium: NUMBER, The minimum number of milligrams of calcium the recipe must have.
    maxCalcium: NUMBER, The maximum number of milligrams of calcium the recipe can have.
    minCholine: NUMBER, The minimum number of milligrams of choline the recipe must have.
    maxCholine: NUMBER, The maximum number of milligrams of choline the recipe can have.
    minCholesterol: NUMBER, The minimum number of milligrams of cholesterol the recipe must have.
    maxCholesterol: NUMBER, The maximum number of milligrams of cholesterol the recipe can have.
    minFluoride: NUMBER, The minimum number of milligrams of fluoride the recipe must have.
    maxFluoride: NUMBER, The maximum number of milligrams of fluoride the recipe can have.
    minSaturatedFat: NUMBER, The minimum number of grams of saturated fat the recipe must have.
    maxSaturatedFat: NUMBER, The maximum number of grams of saturated fat the recipe can have.
    minVitaminA: NUMBER, The minimum number of IU of Vitamin A the recipe must have.
    maxVitaminA: NUMBER, The maximum number of IU of Vitamin A the recipe can have.
    minVitaminC: NUMBER, The minimum number of milligrams of Vitamin C the recipe must have.
    maxVitaminC: NUMBER, The maximum number of milligrams of Vitamin C the recipe can have.
    minVitaminD: NUMBER, The minimum number of micrograms of Vitamin D the recipe must have.
    maxVitaminD: NUMBER, The maximum number of micrograms of Vitamin D the recipe can have.
    minVitaminE: NUMBER, The minimum number of milligrams of Vitamin E the recipe must have.
    maxVitaminE: NUMBER, The maximum number of milligrams of Vitamin E the recipe can have.
    minVitaminK: NUMBER, The minimum number of micrograms of Vitamin K the recipe must have.
    maxVitaminK: NUMBER, The maximum number of micrograms of Vitamin K the recipe can have.
    minVitaminB1: NUMBER, The minimum number of milligrams of Vitamin B1 the recipe must have.
    maxVitaminB1: NUMBER, The maximum number of milligrams of Vitamin B1 the recipe can have.
    minVitaminB2: NUMBER, The minimum number of milligrams of Vitamin B2 the recipe must have.
    maxVitaminB2: NUMBER, The maximum number of milligrams of Vitamin B2 the recipe can have.
    minVitaminB3: NUMBER, The minimum number of milligrams of Vitamin B3 the recipe must have.
    maxVitaminB3: NUMBER, The maximum number of milligrams of Vitamin B3 the recipe can have.
    minVitaminB5: NUMBER, The minimum number of milligrams of Vitamin B5 the recipe must have.
    maxVitaminB5: NUMBER, The maximum number of milligrams of Vitamin B5 the recipe can have.
    minVitaminB6: NUMBER, The minimum number of milligrams of Vitamin B6 the recipe must have.
    maxVitaminB6: NUMBER, The maximum number of milligrams of Vitamin B6 the recipe can have.
    minVitaminB12: NUMBER, The minimum number of micrograms of Vitamin B12 the recipe must have.
    maxVitaminB12: NUMBER, The maximum number of micrograms of Vitamin B12 the recipe can have.
    minFiber: NUMBER, The minimum number of grams of fiber the recipe must have.
    maxFiber: NUMBER, The maximum number of grams of fiber the recipe can have.
    minFolate: NUMBER, The minimum number of micrograms of folate the recipe must have.
    maxFolate: NUMBER, The maximum number of micrograms of folate the recipe can have.
    minFolicAcid: NUMBER, The minimum number of micrograms of folic acid the recipe must have.
    maxFolicAcid: NUMBER, The maximum number of micrograms of folic acid the recipe can have.
    minIodine: NUMBER, The minimum number of micrograms of iodine the recipe must have.
    maxIodine: NUMBER, The maximum number of micrograms of iodine the recipe can have.
    minIron: NUMBER, The minimum number of milligrams of iron the recipe must have.
    maxIron: NUMBER, The maximum number of milligrams of iron the recipe can have.
    minMagnesium: NUMBER, The minimum number of milligrams of magnesium the recipe must have.
    maxMagnesium: NUMBER, The maximum number of milligrams of magnesium the recipe can have.
    minManganese: NUMBER, The minimum number of milligrams of manganese the recipe must have.
    maxManganese: NUMBER, The maximum number of milligrams of manganese the recipe can have.
    minPhosphorus: NUMBER, The minimum number of milligrams of phosphorus the recipe must have.
    maxPhosphorus: NUMBER, The maximum number of milligrams of phosphorus the recipe can have.
    minPotassium: NUMBER, The minimum number of milligrams of potassium the recipe must have.
    maxPotassium: NUMBER, The maxnimum number of milligrams of potassium the recipe can have.
    minSelenium: NUMBER, The minimum number of micrograms of selenium the recipe must have.
    maxSelenium: NUMBER, The maximum number of micrograms of selenium the recipe can have.
    minSodium: NUMBER, The minimum number of milligrams of sodium the recipe must have.
    maxSodium: NUMBER, The maximum number of milligrams of sodium the recipe can have.
    minSugar: NUMBER, The minimum number of grams of sugar the recipe must have.
    maxSugar: NUMBER, The maximum number of grams of sugar the recipe can have.
    minZinc: NUMBER, The minimum number of milligrams of zinc the recipe must have.
    maxZinc: NUMBER, The maximum number of milligrams of zinc the recipe can have.
    author: STRING, The username of the recipe author.
    equipment: STRING, The equipment required. Multiple values will be interpreted as 'or'. For example, value could be "blender, frying pan, bowl" } */

  getAutocompleteMenuItemSearch: (query, number = 10) =>
    SPOONACULAR_API("/food/menuItems/suggest", { query, number }),
  // OPTIONAL: 'number' must be between 1 and 25.

  getTalkToChatbot: (text, contextId = "") =>
    SPOONACULAR_API("/food/converse", { text, contextId }),
  //OPTIONAL: An arbitrary globally unique id for your conversation. The conversation can contain states so you should pass your context id if you want the bot to be able to remember the conversation.
  // Gets all users
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the user with the given username
  getUser: function(username) {
    return axios.get("/api/users/" + username);
  },
  updateUser: function(username, data) {
    return axios.put("/api/users/" + username, data);
  },
  createUser: function(userData) {
    return axios.put("/api/users", userData);
  },
  // Deletes the user with the given username
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a user to the database
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveRecipe: function(recipeData) {
    console.log("saveRecipe: recipeData", recipeData);
    return axios.post("/api/users", recipeData);
  },
  googleLogin: function() {
    console.log("test");
    //shouldn't the route be /auth/google ?  Could be!
    //this is just an http GET request. so we gotta follow the file tree to see where to go next
    // Yes - so, we basically just have to get "/auth/google" to fire, then that gets passport going
    //a cors error means the headers for your HTTP request are wrong.
    //Yeah, i was trying to fix the headers, couldn't get it to work
    //fuck all of this... its way over our heads. it'll work fine if...  Was following some examples, but not really sure how it is implemented
    //we want to accept the origin of localhost:3000

    return axios({
      method: "GET",
      url: "/auth/google",
      headers: {
        "Access-Control-Allow-Origin": "http://domain.com:3000"
      }
    });
    // return axios.get("/api/auth/google");
    // return axios.get("/auth/google");
    // return axios.get("/api/auth/google");
  }
};

// const SPOONACULAR_API = (url, params = {}) => {
//   console.log({url, params})
//   return axios({
//     method:"GET",
//     url:"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com" + url,
//     headers:{
//       "content-type":"application/octet-stream",
//       "x-rapidapi-key": "79cdd77d2emsh1fcd47944c92478p11ac47jsn27dbe9aa5a72",
//       "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
//     },
//     params : {...params}
//   });
// };
