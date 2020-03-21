const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Users collection and inserts the users below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/cookingdb");

const userSeed = [
  {
    username: "chrisMcKee",
    id: 42,
    googleId: "chris42",
    thumbnail: "String",
    diet: [],
    intolerances: [],
    recipies: [
      {
        title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
        id: 716429
        // image: { type: String },
        // servingSize: { type: Number },
        // cookTime: { type: Number },
        // sourceUrl: { type: String },
        // spoonacularSourceUrl: { type: String },
        // pricePerServing: Number,
        // extendedIngredients: [
        //   {
        //     name: String,
        //     aisle: String,
        //     amount: Number,
        //     unit: String
        //   }
        // ]
      }
    ]
    // groceryList: [
    //   {
    //     name: String,
    //     amount: Number,
    //     unit: String,
    //     aisle: String
    //   }
    // ]
  }
  // {
  //   title: "Lord of the Flies",
  //   author: "William Golding",
  //   synopsis:
  //     "The tale of a party of shipwrecked schoolboys, marooned on a coral island, who at first enjoy the freedom of the situation but soon divide into fearsome gangs which turn the paradise island into a nightmare of panic and death.",
  //   date: new Date(Date.now())
  // },
  // {
  //   title: "The Catcher in the Rye",
  //   author: "J.D. Salinger",
  //   synopsis:
  //     "The Catcher in the Rye is a 1951 novel by J. D. Salinger. A controversial novel originally published for adults, it has since become popular with adolescent readers for its themes of teenage angst and alienation. It has been translated into almost all of the world's major languages. Around 1 million copies are sold each year with total sales of more than 65 million users. The novel's protagonist Holden Caulfield has become an icon for teenage rebellion. The novel also deals with complex issues of innocence, identity, belonging, loss, and connection.",
  //   date: new Date(Date.now())
  // }
];

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
