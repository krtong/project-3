const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  // id: { type: Number },
  googleId: String,
  facebookID: String,
  thumbnail: String,
  email: String,
  diet: [],
  intolerances: [],
  recipes: [
    {
      title: { type: String, required: true },
      id: { type: Number, required: true },
      image: { type: String },
      servingSize: { type: Number },
      cookTime: { type: Number },
      sourceUrl: { type: String },
      spoonacularSourceUrl: { type: String },
      pricePerServing: Number,
      extendedIngredients: [
        {
          name: String,
          aisle: String,
          amount: Number,
          unit: String
        }
      ]
    }
  ],
  groceryList: [
    {
      name: String,
      amount: Number,
      unit: String,
      aisle: String
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
