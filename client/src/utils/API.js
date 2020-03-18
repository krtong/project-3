import axios from "axios";

const axiosSpoonacular = (url, params = {}) => {
  return axios({
    params,
    method:"GET",
    url:"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com" + url,
    headers:{
      "content-type":"application/octet-stream",
      "x-rapidapi-key": "79cdd77d2emsh1fcd47944c92478p11ac47jsn27dbe9aa5a72",
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
    }
  });
};



export default {
  //Saving the old homework API calls just for reference.
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  getRandomDog: function() {
    return axios.get("https://dog.ceo/api/breeds/image/random");
  },
  getDogsOfBreed: function(breed) {
    return axios.get(`https://dog.ceo/api/breed/${breed}/images`);
  },
  getBaseBreedsList: function() {
    return axios.get("https://dog.ceo/api/breeds/list");
  },
  getSearchRecipes: function(query) {
    return axiosSpoonacular('/recipes/search', {query});
  },


  //Spoonacular API
  //for more: https://rapidapi.com/spoonacular/api/recipe-food-nutrition?endpoint=596be52ee4b03e024df91f68

  getQuickAnswer: (query) => axiosSpoonacular('/recipes/quickAnswer', {"q": query}),

  getMatchRecipesToDailyCalories: (targetCalories = 2000, timeFrame = "day") => axiosSpoonacular("/recipes/mealplans/generate", {targetCalories, timeFrame}),

  getSummarizeRecipe: (id) => axiosSpoonacular(`/recipes/${id}/summary`),

  getVisualizeMenuItemNutrition: (id) => axiosSpoonacular(`/food/menuItems/${id}/nutritionWidget`), //headers may require: "accept":"text/html"

  getGenerateMealPlan: (timeFrame = "day", targetCalories = "2000", diet = "omnivore", exclude = "") => axiosSpoonacular("/recipes/mealplans/generate", {timeFrame, targetCalories, diet, exclude}),

  getRecipeInformationBulk: (idsArray = [], includeNutrition = false) => axiosSpoonacular('/recipes/informationBulk', {includeNutrition, "ids": idsArray.join('%')}),

};