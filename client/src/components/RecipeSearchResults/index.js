import React from "react";
import "./style.css";


function RecipeSearchResults({results, addRecipe}) {
  // console.log({results})
  return !results[0] ? "" : !results[0].ingredients ? "Loading... 🌭🍣🥧🍛🥙" : (
    <div className="card-group">
    {results.map((recipe, idx) => {
      // console.log(`RECIPE${idx}`,{recipe})
      const {id, title, readyInMinutes, servings, imageURL, ingredients, recipeUrl, urlName} = recipe;
        return(
      <div key={id} className="col" style={{margin:'10px'}}>
        <div className="card border-0">
          <div className="card-title" style={{backgroundImage: `url("${imageURL}")`}}>
            <div style={{height: "38px", width: "38px",background: "#eee"}}>            
              <a style={{"font-size": "36px", "font-weight" : "700"}}
                 onClick={() => addRecipe(recipe)}>+</a>
            </div>
          </div>
          <div className="card-body">
            <h4>{title}</h4>
            <p className="text-muted card-text">Servings: {servings} | Time: {readyInMinutes}</p>
            {/* {ingredients &&
            <ol>Ingredients: {ingredients.map(ingredient =>
              <li>name: {ingredient.name} | aisle: {ingredient.aisle} | amount: {ingredient.amount} {ingredient.unit}</li>
            )
            }</ol>} */}
          </div>
          {recipeUrl && <p>Recipe <a href={recipeUrl}>{urlName}</a></p>}
        </div>
      </div>
    )}
  )}
  </div>
  );
}

export default RecipeSearchResults;


