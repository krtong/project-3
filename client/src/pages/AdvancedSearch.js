import AdvancedSearchFilter from "../components/AdvancedSearchFilter";
import RecipeSearchResults from "../components/RecipeSearchResults";
import RecipeSearchForm from "../components/RecipeSearchForm"
import Container from "../components/Container";
import React, { Component } from "react";
import Alert from "../components/Alert";
import API from "../utils/API";

class AdvancedSearch extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: "",
      submitClicked: false,
      results: [],
      error: ""
    };
  };

  searchQuery = event => {
    const query = event.target.value;
    this.setState({query});
  };

  handleFormSubmit = async event => {
    const {query} = this.state;
    event.preventDefault();
    const requiredParameters = (pageNumber = 0, resultsPerPage = 10) => ({
      query,
      limitLicense: false,
      offset: pageNumber * resultsPerPage,
      number: resultsPerPage
    });

    const optionalParameters = ({
      fillIngredients: true,
      instructionsRequired: false,
      addRecipeInformation: true
    });
    
    try {
      const basicJSON = await API.getSearchRecipes(requiredParameters());
      let results = (function(api = basicJSON.data.results){
        let json = {};

        for (let i = 0; i < api.length; i++){
          const {id, title, readyInMinutes, servings, image} = api[i];
          json[id] = {
            id,
            title,
            readyInMinutes,
            servings,
            imageURL: "https://spoonacular.com/recipeImages/" + image
          };
        };

        return json;
      })();
      this.setState({ results: Object.values(results), error: "", submitClicked: true});
      const complexJSON = await API.getSearchRecipesComplex(requiredParameters(), optionalParameters);
      complexJSON.data.results.forEach(({id, missedIngredients, diets, sourceUrl}) => 
        Object.assign(results[id], {
          diets,
          recipeUrl: sourceUrl,
          ingredients: missedIngredients,
          urlName: sourceUrl.split('http://').join('').split('www.').join('').split('.com')[0]
        })
      );
      this.setState({ results: Object.values(results), error: "", submitClicked: true});
    }
    catch (error) {
      console.log(error);
    }
  };
  
  render() {
    const {searchQuery, handleFormSubmit} = this;
    const {error, submitClicked, results} = this.state;
    const alertCSS = { opacity: this.state.error ? 1 : 0, marginBottom: 10 };
    return (
      <div>
        <Container style={{ minHeight: "80%" }}>
          <h5>{this.props.user && <span>Welcome, {this.props.user}😘</span>}</h5> 
          <h1 className="text-center"> Search By Recipe! </h1>
          <Alert style={alertCSS} type="danger"> {error} </Alert>
          <AdvancedSearchFilter />
          <RecipeSearchForm handleFormSubmit={handleFormSubmit} handleInputChange={searchQuery} />
          <RecipeSearchResults 
          results={results} 
          submitClicked={submitClicked} 
          addRecipe={this.props.addRecipe} 
          deleteRecipe={this.props.deleteRecipe}
           />
        </Container>
      </div>
    );
  }
};

export default AdvancedSearch;
