const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Users collection and inserts the users below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/cookingdb");

const userSeed = [{
  username: "chrisMcKee",
  userID: 1,
  googleId: "123456789012345678901",
  facebookID: "fakefacebookIDhere",
  thumbnail: "String",
  diet: [],
  intolerances: [],
  recipes: [
    {
      id: 86915,
      title: "Maple-Soy Glazed Salmon (America's Test Kitchen)",
      readyInMinutes: 25,
      servings: 4,
      imageURL: "https://spoonacular.com/recipeImages/maple-soy-glazed-salmon-2-86915.jpg",
      diets: ["gluten free", "dairy free", "fodmap friendly", "pescatarian"],
      recipeUrl: "http://www.food.com/recipe/maple-soy-glazed-salmon-americas-test-kitchen-407910",
      ingredients: [{ 
        id: 19911,
        amount: 0.5,
        unit: "cup",
        unitLong: "cups",
        unitShort: "cup",
        aisle: "Cereal",
        name: "maple syrup",
        original: "1/2 cup maple syrup",
        originalString: "1/2 cup maple syrup",
        originalName: "maple syrup",
        metaInformation: [],
        meta: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/maple-syrup.png"
      },{
        id: 15076,
        amount: 24,
        unit: "ounce",
        unitLong: "ounces",
        unitShort: "oz",
        aisle: "Seafood",
        name: "salmon fillets",
        original: "4 (6 ounce) salmon fillets (1 1/4 inches thick)",
        originalString: "4 (6 ounce) salmon fillets (1 1/4 inches thick)",
        originalName: "salmon fillets (1 1/4 inches thick)",
        metaInformation:  ["thick", "()"],
        meta:  ["thick", "()"],
        image: "https://spoonacular.com/cdn/ingredients_100x100/salmon.png"
      },{
        id: 12023,
        amount: 2,
        unit: "teaspoons",
        unitLong: "teaspoons",
        unitShort: "tsp",
        aisle: "Ethnic Foods;Spices and Seasonings",
        name: "sesame seeds",
        original: "2 teaspoons sesame seeds, toasted",
        originalString: "2 teaspoons sesame seeds, toasted",
        originalName: "sesame seeds, toasted",
        metaInformation: ["toasted"],
        meta: ["toasted"],
        image: "https://spoonacular.com/cdn/ingredients_100x100/sesame-seeds.png"
      }]
  }],
  groceryList:[{ 
    id: 19911,
    amount: 0.5,
    unit: "cup",
    unitLong: "cups",
    unitShort: "cup",
    aisle: "Cereal",
    name: "maple syrup",
    original: "1/2 cup maple syrup",
    originalString: "1/2 cup maple syrup",
    originalName: "maple syrup",
    metaInformation: [],
    meta: [],
    image: "https://spoonacular.com/cdn/ingredients_100x100/maple-syrup.png"
  },{
    id: 15076,
    amount: 24,
    unit: "ounce",
    unitLong: "ounces",
    unitShort: "oz",
    aisle: "Seafood",
    name: "salmon fillets",
    original: "4 (6 ounce) salmon fillets (1 1/4 inches thick)",
    originalString: "4 (6 ounce) salmon fillets (1 1/4 inches thick)",
    originalName: "salmon fillets (1 1/4 inches thick)",
    metaInformation:  ["thick", "()"],
    meta:  ["thick", "()"],
    image: "https://spoonacular.com/cdn/ingredients_100x100/salmon.png"
  },{
    id: 12023,
    amount: 2,
    unit: "teaspoons",
    unitLong: "teaspoons",
    unitShort: "tsp",
    aisle: "Ethnic Foods;Spices and Seasonings",
    name: "sesame seeds",
    original: "2 teaspoons sesame seeds, toasted",
    originalString: "2 teaspoons sesame seeds, toasted",
    originalName: "sesame seeds, toasted",
    metaInformation: ["toasted"],
    meta: ["toasted"],
    image: "https://spoonacular.com/cdn/ingredients_100x100/sesame-seeds.png"
  }]
},
{
  username: "Cody Brock",
  userID: 2,
  googleId: "109743843228596653751",
  facebookID: "fakefacebookIDhere",
  thumbnail: 'https://lh3.googleusercontent.com/-zP9cGN_7iPI/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nAjaE0f4vWhGR6xpjmndnylTR2L2w/photo.jpg',
  diet: [],
  intolerances: [],
  recipes: [
    {
      id: 86915,
      title: "Maple-Soy Glazed Salmon (America's Test Kitchen)",
      readyInMinutes: 25,
      servings: 4,
      imageURL: "https://spoonacular.com/recipeImages/maple-soy-glazed-salmon-2-86915.jpg",
      diets: ["gluten free", "dairy free", "fodmap friendly", "pescatarian"],
      recipeUrl: "http://www.food.com/recipe/maple-soy-glazed-salmon-americas-test-kitchen-407910",
      ingredients: [{ 
        id: 19911,
        amount: 0.5,
        unit: "cup",
        unitLong: "cups",
        unitShort: "cup",
        aisle: "Cereal",
        name: "maple syrup",
        original: "1/2 cup maple syrup",
        originalString: "1/2 cup maple syrup",
        originalName: "maple syrup",
        metaInformation: [],
        meta: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/maple-syrup.png"
      },{
        id: 15076,
        amount: 24,
        unit: "ounce",
        unitLong: "ounces",
        unitShort: "oz",
        aisle: "Seafood",
        name: "salmon fillets",
        original: "4 (6 ounce) salmon fillets (1 1/4 inches thick)",
        originalString: "4 (6 ounce) salmon fillets (1 1/4 inches thick)",
        originalName: "salmon fillets (1 1/4 inches thick)",
        metaInformation:  ["thick", "()"],
        meta:  ["thick", "()"],
        image: "https://spoonacular.com/cdn/ingredients_100x100/salmon.png"
      },{
        id: 12023,
        amount: 2,
        unit: "teaspoons",
        unitLong: "teaspoons",
        unitShort: "tsp",
        aisle: "Ethnic Foods;Spices and Seasonings",
        name: "sesame seeds",
        original: "2 teaspoons sesame seeds, toasted",
        originalString: "2 teaspoons sesame seeds, toasted",
        originalName: "sesame seeds, toasted",
        metaInformation: ["toasted"],
        meta: ["toasted"],
        image: "https://spoonacular.com/cdn/ingredients_100x100/sesame-seeds.png"
      }]
  }],
  groceryList:[{ 
    id: 19911,
    amount: 0.5,
    unit: "cup",
    unitLong: "cups",
    unitShort: "cup",
    aisle: "Cereal",
    name: "maple syrup",
    original: "1/2 cup maple syrup",
    originalString: "1/2 cup maple syrup",
    originalName: "maple syrup",
    metaInformation: [],
    meta: [],
    image: "https://spoonacular.com/cdn/ingredients_100x100/maple-syrup.png"
  },{
    id: 15076,
    amount: 24,
    unit: "ounce",
    unitLong: "ounces",
    unitShort: "oz",
    aisle: "Seafood",
    name: "salmon fillets",
    original: "4 (6 ounce) salmon fillets (1 1/4 inches thick)",
    originalString: "4 (6 ounce) salmon fillets (1 1/4 inches thick)",
    originalName: "salmon fillets (1 1/4 inches thick)",
    metaInformation:  ["thick", "()"],
    meta:  ["thick", "()"],
    image: "https://spoonacular.com/cdn/ingredients_100x100/salmon.png"
  },{
    id: 12023,
    amount: 2,
    unit: "teaspoons",
    unitLong: "teaspoons",
    unitShort: "tsp",
    aisle: "Ethnic Foods;Spices and Seasonings",
    name: "sesame seeds",
    original: "2 teaspoons sesame seeds, toasted",
    originalString: "2 teaspoons sesame seeds, toasted",
    originalName: "sesame seeds, toasted",
    metaInformation: ["toasted"],
    meta: ["toasted"],
    image: "https://spoonacular.com/cdn/ingredients_100x100/sesame-seeds.png"
  }]
}];

db.User.remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });





