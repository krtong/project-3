import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import RecipeSearchForm from "../components/RecipeSearchForm"
import RecipeSearchResults from "../components/RecipeSearchResults";
import AdvancedSearchFilter from "../components/AdvancedSearchFilter";
import Alert from "../components/Alert";

class AdvancedSearch extends Component {
  state = {
    query: "",
    submitClicked: false,
    results: [],
    error: ""
  };

  // When the component mounts, get a list of all available base breeds and update this.state.breeds
  componentDidMount() {
    // API.getBaseBreedsList()
    //   .then(res => this.setState({ breeds: res.data.message }))
    //   .catch(err => console.log(err));
  }


  searchQuery = event => {
    const query = event.target.value;
    this.setState({query});
  };


  handleFormSubmit = async event => {
    event.preventDefault();

    const requiredParameters = {
      query: this.state.query,
      number: 1,
      offset: 0,
    }
  
    const optionalParameters = {
      limitLicense: false,
      fillIngrediants: true,
      instructionsRequired: true,
      addRecipeInformation: true,
    }
    
    try {
      const res = await API.getSearchRecipes(requiredParameters, optionalParameters);
      res.data.status === "error" ? 
      this.setState({error: res.data.message}) :
      this.setState({ results: res.data.results, error: "", submitClicked: true});
      console.log("res", res)
      // console.log([this.state.error])
    }

    catch (error) {
      console.log(error);
    }
  };


  // getRecipeInformationBulk: (idsArray = [], includeNutrition = false) => SPOONACULAR_API('/recipes/informationBulk', {includeNutrition, "ids": idsArray.join('%')}),
  /* idsArray:
  ids: ARRAY of numbers REQUIRED

  Optional Parameters:
  { includeNutrition: BOOLEAN, Include nutrition data to the recipe information. } */


  // getSearchRecipes : (query, optionalParameters)  => SPOONACULAR_API('/recipes/search', {query, ...optionalParameters}),
  /* optionalParameters: 
  { cuisine: STRING,  The cuisine(s) of the recipes. One or more (comma separated) of the following: african, chinese, japanese, korean, vietnamese, thai, indian, british, irish, french, italian, mexican, spanish, middle eastern, jewish, american, cajun, southern, greek, german, nordic, eastern european, caribbean, or latin american.
    diet: STRING, The diet to which the recipes must be compliant. Possible values are: pescetarian, lacto vegetarian, ovo vegetarian, vegan, and vegetarian.
    excludeIngredients: STRING, An comma-separated list of ingredients or ingredient types that must not be contained in the recipes.
    intolerances: STRING A comma-separated list of intolerances. All found recipes must not have ingredients that could cause problems for people with one of the given tolerances. Possible values are: dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat.
    number: NUMBER, The number of results to return (between 0 and 100).
    offset: NUMBER, The number of results to skip (between 0 and 900).
    type: STRING, The type of the recipes. One of the following: main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink.
    limitLicense: BOOLEAN, Whether the recipes should have an open license that allows for displaying with proper attribution.
    instructionsRequired: BOOLEAN Whether the recipes must have instructions. } */




  render() {
    return (
      <div>
        <Container style={{ minHeight: "80%" }}>
        <h1 className="text-center"> Search By Recipe! </h1>
        <Alert type="danger" style={{ opacity: this.state.error ? 1 : 0, marginBottom: 10 }} > {this.state.error} </Alert>

        <AdvancedSearchFilter />
        <RecipeSearchForm handleFormSubmit={this.handleFormSubmit} handleInputChange={this.searchQuery} />
        <div className="card-group">
          {this.state.results.map((
            (root) => {
              const title = root.title;
              const id = root.id;
              const image = root.image;
              const servingSize = root.servings;
              const cookingTime = root.readyInMinutes;
              const sourceUrl = root.sourceUrl;
              const spoonacularSourceUrl = root.spoonacularSourceUrl;
              const pricePerServing = root.pricePerServing;
              const diet = root.diet;

              //this worked with the fake data from the rapidAPI example, but the real data is different and we'll have to find a workaround.
              const extendedIngredients = root.analyzedInstructions ? JSON.stringify(root.analyzedInstructions, null, 2) : null
              return(
                <div>
                  <div>{title} </div>
                  <img src={image} />
                  <div>serving size: {servingSize} </div>
                  <div>cooking time: {cookingTime} </div>
                  <div><a href={sourceUrl}>Link to recipe </a> </div>
                  <div>Price per serving: ${pricePerServing} </div>
                  <div>Diet: {diet} </div>
                  <div>{extendedIngredients}</div>
                </div>
              )
            })
          )}
        </div>
        </Container>
      </div>
    );
  }
};

export default AdvancedSearch;
