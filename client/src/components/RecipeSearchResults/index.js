import React from "react";
import "./style.css"
import "./bootstrap.min.css";

function RecipeSearchResults({results}) {
  return (
    
    <div class="row">
    {results.map(({id, title, readyInMinutes, servings, image}) => (
      <div key={id} class="col-md-6 col-lg-4">
        <div class="card border-0"><a href="#"><img className="card-img-top scale-on-hover" src={"https://spoonacular.com/recipeImages/" + image} alt={title} /></a>
          <div class="card-body">
            <h6><a href="#" id={id}>{title}</a></h6>
            <p class="text-muted card-text">Servings: {servings} | Time: {readyInMinutes}</p>
          </div>
        </div>
      </div>
    ))}

</div>

//     <ul className="list-group search-results">
//       {props.results.map(({id, title, readyInMinutes, servings, image}) => (
//         <li key={id} className="list-group-item">
//           <img alt="Recipe" src={"https://spoonacular.com/recipeImages/" + image} className="img-fluid img-thumbnail" />
//           <h3>{title}</h3>
//           <span>Servings: {servings} | Time: {readyInMinutes}</span>
//         </li>
//       ))}
//     </ul>
  );
}

export default RecipeSearchResults;


