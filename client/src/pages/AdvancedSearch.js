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
      const res = await API.getSearchRecipesComplex(requiredParameters, optionalParameters);
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

  /*
  getSearchRecipesComplex: (requiredParameters, optionalParameters) => SPOONACULAR_API('/recipes/searchComplex', {...requiredParameters, ...optionalParameters}), 
    /* requiredParameters: {
      limitLicense: BOOLEAN, Whether the recipes should have an open license that allows for displaying with proper attribution.
      offset: NUMBER, The number of results to skip (between 0 and 900).
      number: NUMBER, The number of results to return (between 1 and 100).
    }
    */

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
              const extendedIngredients = JSON.stringify(root.analyzedInstructions, null, 2)
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
