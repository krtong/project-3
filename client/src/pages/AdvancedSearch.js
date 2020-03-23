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
    const {query} = this.state;
    event.preventDefault();
    
    try {
      const res = await API.getSearchRecipes(query);
      res.data.status === "error" ? 
      this.setState({error: res.data.message}) :
      this.setState({ results: res.data.results, error: "", submitClicked: true});
      console.log([this.state.error])
    }
    catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <Container style={{ minHeight: "80%" }}>
          <h1 className="text-center">
            Search By Recipe!
          </h1>
          <Alert
            type="danger"
            style={{ opacity: this.state.error ? 1 : 0, marginBottom: 10 }}
          > 
          {this.state.error}
          </Alert>
          <AdvancedSearchFilter />
          <RecipeSearchForm
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.searchQuery}
          />
          <RecipeSearchResults 
            results={this.state.results} 
            submitClicked={this.state.submitClicked} 
          />
        </Container>
      </div>
    );
  }
};

export default AdvancedSearch;
