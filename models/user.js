const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  googleId: String,
  facebookID: String,
  thumbnail: String,
  email: String,
  diet: [],
  intolerances: [],
  recipes: [{
    id: {type: Number, required: true },
    title:{ type: String, required: true },
    readyInMinutes: {type: Number, required: true },
    servings: {type: Number, required: true },
    imageURL: { type: String, required: true },
    diets: [{ type: String, required: true }],
    recipeUrl: { type: String, required: true },
    ingredients: [{ 
      id: {type: Number, required: true },
      amount: {type: Number, required: true },
      unit: { type: String, required: true },
      unitLong: { type: String, required: true },
      unitShort: { type: String, required: true },
      aisle: { type: String, required: true },
      name: { type: String, required: true },
      original:{ type: String, required: true },
      originalString: { type: String, required: true },
      originalName:{ type: String, required: true },
      metaInformation: [],
      meta: [],
      image: { type: String, required: true }
    }]
  }],
  groceryList: [{ 
        id: {type: Number, required: true },
        amount: {type: Number, required: true },
        unit: { type: String, required: true },
        unitLong: { type: String, required: true },
        unitShort: { type: String, required: true },
        aisle: { type: String, required: true },
        name: { type: String, required: true },
        original:{ type: String, required: true },
        originalString: { type: String, required: true },
        originalName:{ type: String, required: true },
        metaInformation: [],
        meta: [],
        image: { type: String, required: true }
    }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
