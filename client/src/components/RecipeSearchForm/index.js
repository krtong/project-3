import React from "react";
import "./style.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function RecipeSearchForm(props) {
  return (
    <form className="search">
      <div className="form-group">
        <label htmlFor="breed">Recipe Name:</label>
        <input
          value={props.search}
          onChange={props.handleInputChange}
          type="text"
          className="form-control"
          placeholder="Type in a recipe name to begin"
        />
        <datalist id="recipes">
        </datalist>
        <button type="submit" onClick={props.handleFormSubmit} className="btn btn-success">
          Search
        </button>
      </div>
    </form>
  );
}

export default RecipeSearchForm;
