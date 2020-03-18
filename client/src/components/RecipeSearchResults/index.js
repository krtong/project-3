import React from "react";
import "./style.css";

function RecipeSearchResults({results}) {
  return (
    <div className="card-group">
    {results.map(({id, title, readyInMinutes, servings, image}) => (
      <div key={id} className="col-md-2 col-lg-5" style={{margin:'10px'}}>
        <div className="card border-0">
          <div className="card-title" style={{backgroundImage: `url("https://spoonacular.com/recipeImages/${image}")`}}></div>
          <div className="card-body">
            <h4>{title}</h4>
            <p className="text-muted card-text">Servings: {servings} | Time: {readyInMinutes}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
  );
}

export default RecipeSearchResults;


