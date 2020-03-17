import React from "react";
import "./style.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function RecipeSearchForm(props) {
  return (
    <form className="search">
      <div className="form-group">
        <label htmlFor="breed">Recipe Search:</label>
        <input
          value={props.search}
          onChange={props.handleInputChange}
          name="recipe"
          list="recipes"
          type="text"
          className="form-control"
          placeholder="Type in a recipe name to begin"
          id="breed"
        />
        <button type="submit" onClick={props.handleFormSubmit} className="btn btn-success">
          Search
        </button>
      </div>
    </form>
  );
}

export default RecipeSearchForm;
