import React from "react";
import "./style.css";

function SearchResults(props) {
  return (
    <ul className="list-group search-results">
      {props.results.map(({id, title, readyInMinutes, servings, image}) => (
        <li key={id} className="list-group-item">
          <img alt="Recipe" src={"https://spoonacular.com/recipeImages/" + image} className="img-fluid img-thumbnail" />
          <h3>{title}</h3>
          <span>Servings: {servings} | Time: {readyInMinutes}</span>
        </li>
      ))}
    </ul>
  );
}

export default SearchResults;
