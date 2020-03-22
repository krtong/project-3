import React from "react";
import "./style.css";

function RecipeSearchResults({results}) {

  /* results[0] = 
    vegetarian: true, 
    vegan: true, glutenFree: true, dairyFree: true, veryHealthy: false, …}
    vegetarian: true
    vegan: true
    glutenFree: true
    dairyFree: true
    veryHealthy: false
    cheap: false
    veryPopular: true
    sustainable: false
    weightWatcherSmartPoints: 2
    gaps: "no"
    lowFodmap: false
    preparationMinutes: 5
    cookingMinutes: 0
    sourceUrl: "http://premeditatedleftovers.com/recipes-cooking-tips/the-fastest-easiest-crispiest-hash-browns-ever/"
    spoonacularSourceUrl: "https://spoonacular.com/the-fastest-easiest-crispiest-hash-browns-ever-532191"
    aggregateLikes: 1275
    spoonacularScore: 96
    healthScore: 23
    creditsText: "Premeditated Left Over"
    sourceName: "Premeditated Left Over"
    pricePerServing: 22.5
    extendedIngredients: Array(5)
    0: {id: 11215, aisle: "Produce", image: "garlic.jpg", consistency: "solid", name: "garlic", …}
    1: {id: 11282, aisle: "Produce", image: "brown-onion.png", consistency: "solid", name: "onion", …}
    2: {id: 1002030, aisle: "Spices and Seasonings", image: "pepper.jpg", consistency: "solid", name: "pepper", …}
    3: {id: 11362, aisle: "Produce", image: "potatoes-yukon-gold.png", consistency: "solid", name: "potatoes", …}
    4: {id: 1042047, aisle: "Spices and Seasonings", image: "garlic-salt.jpg", consistency: "solid", name: "seasoned salt", …}
    length: 5
    __proto__: Array(0)
    id: 532191
    title: "The Fastest, Easiest, Crispiest Hash Browns Ever"
    readyInMinutes: 5
    servings: 8
    image: "https://spoonacular.com/recipeImages/532191-556x370.jpg"
    imageType: "jpg"
    summary: "The Fastest, Easiest, Crispiest Hash Browns Ever might be just the side dish you are searching for. This recipe makes 8 servings with <b>74 calories</b>, <b>3g of protein</b>, and <b>0g of fat</b> each. For <b>23 cents per serving</b>, this recipe <b>covers 8%</b> of your daily requirements of vitamins and minerals. Plenty of people made this recipe, and 1275 would say it hit the spot. Head to the store and pick up seasoned salt, onion, pepper, and a few other things to make it today. It is a good option if you're following a <b>gluten free, whole 30, and vegan</b> diet. From preparation to the plate, this recipe takes approximately <b>5 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 97%</b>. This score is great. Try <a href="https://spoonacular.com/recipes/hash-browns-with-ham-425689">Hash Browns with Ham</a>, <a href="https://spoonacular.com/recipes/hash-browns-40148">Hash Browns</a>, and <a href="https://spoonacular.com/recipes/zucchini-hash-browns-105587">Zucchini Hash Browns</a> for similar recipes."
    cuisines: []
    dishTypes: ["side dish"]
    diets: (4) ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan"]
    occasions: []
    winePairing: {}
    instructions: "Preheat waffle iron.Set food processor on the grate setting.Run potatoes, onion and garlic through food processor.Squeeze excess liquid from veggies.Stir veggies together, sprinkle with seasoned salt and pepper and stir to thoroughly combine.Brush or spray your waffle iron with oil. Place ½ cup of grated potatoes on each waffle square. Close the lid and cook for 8 - 10 minutes until hash browns are cooked through and crispy.Repeat with the rest of the grated potatoes."
    analyzedInstructions: Array(1)
    0:
    name: ""
    steps: Array(3)
    0: {number: 1, step: "Preheat waffle iron.Set food processor on the grat…d salt and pepper and stir to thoroughly combine.", ingredients: Array(4), equipment: Array(2)}
    1: {number: 2, step: "Brush or spray your waffle iron with oil.", ingredients: Array(0), equipment: Array(1)}
    2: {number: 3, step: "Place ½ cup of grated potatoes on each waffle squa…ispy.Repeat with the rest of the grated potatoes.", ingredients: Array(1), equipment: Array(0), length: {…}}
    length: 3
    __proto__: Array(0)
    __proto__: Object
    length: 1
    __proto__: Array(0)
    originalId: null
    __proto__: Object */
  return (
    <div className="card-group">
     {results.map(({id, title, readyInMinutes, servings, image, extendedIngredients}) => {
       return(
        <div key={id} className="col-md-2 col-lg-5" style={{margin:'10px'}}>
          <div className="card border-0">
            <div className="card-title" style={{backgroundImage: `url("https://spoonacular.com/recipeImages/${image}")`}}></div>
            <div className="card-body">
              <h4>{title}</h4>
              <p className="text-muted card-text">Servings: {servings} | Time: {readyInMinutes}</p>
              <p>Ingredients: {extendedIngredients.map(({id, aisle, image, name}) => {
                return (
                  name
                // <span ingredientId={id} imageId={image}>{name} ({aisle})</span>
                )}
              ).join(', ')}</p> 
            </div>
          </div>
        </div>
      )}
    )}
    </div>
  );
}

export default RecipeSearchResults;


