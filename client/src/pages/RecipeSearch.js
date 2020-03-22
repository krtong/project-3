import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import RecipeSearchForm from "../components/RecipeSearchForm"
import RecipeSearchResults from "../components/RecipeSearchResults";
import Alert from "../components/Alert";

class Search extends Component {
  state = {
    search: "",
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

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  handleFormSubmit = event => {
      const query = event.target.value;
      this.setState({query});
    };
  
  
    handleFormSubmit = async event => {
      event.preventDefault();
  
      const requiredParameters = {
        query: this.state.search,
        number: 10,
        offset: 0,
      }
    
      const optionalParameters = {
        limitLicense: false,
        fillIngrediants: true,
        instructionsRequired: true,
        addRecipeInformation: true,
      }
      
      try {
        //get initial set of data from basic search
        let {data, status} = await (await API.getSearchRecipes(requiredParameters, optionalParameters));
        // let {data, message, status} = response1
        const ids = response1.data.results.map(({id}) => id)
        console.log({response1})
        // status === "error" ? 
        // this.setState({error: message}) :
        // this.setState({ results: data, error: "", submitClicked: true});

        //get more data once ids have been recieved. this may take a while, so we load the previous data first. 
        const response2 = await API.getRecipeInformationBulk(ids.join(','));
        // let results = response2.data.results
        console.log({response2})
        // message = response2.statusMessage
        // status === "error" ? 
        // this.setState({error: statusMessage}) :
        // this.setState({ results, error: "", submitClicked: true});

      
      }
  
      catch (error) {
        console.log(error);
      }
    };
  
  render() {
    return (
      <div>
        <Container style={{ minHeight: "80%" }}>
          <h1 className="text-center">Search By Recipe!</h1>
          <Alert
            type="danger"
            style={{ opacity: this.state.error ? 1 : 0, marginBottom: 10 }}
          >
            {this.state.error}
          </Alert>
          <RecipeSearchForm
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
          />
          <RecipeSearchResults 
            results={this.state.results} 
            submitClicked={this.state.submitClicked}
          />
        </Container>
      </div>
    );
  }
}

export default Search;
