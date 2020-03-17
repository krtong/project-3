import axios from "axios";

export default {
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
    return axios.get("https://dog.ceo/api/breed/" + breed + "/images");
  },
  getBaseBreedsList: function() {
    return axios.get("https://dog.ceo/api/breeds/list");
  },
  getSearchRecipes: function(query) {
    console.log(query)
    //https://rapidapi.com/spoonacular/api/recipe-food-nutrition?endpoint=55e1b24ae4b0a29b2c36073c
    return axios({
      "method":"GET",
      "url":"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key":"79cdd77d2emsh1fcd47944c92478p11ac47jsn27dbe9aa5a72"
      },"params":{
      "query": query
      }
      })
  },
};