import AdvancedSearchFilter from "../components/AdvancedSearchFilter";
import RecipeSearchResults from "../components/RecipeSearchResults";
import RecipeSearchForm from "../components/RecipeSearchForm"
import Container from "../components/Container";
import React, { Component } from "react";
import Alert from "../components/Alert";
import API from "../utils/API";

class AdvancedSearch extends Component {
  constructor({addRecipe}){
    super();
    this.state = {
      query: "",
      submitClicked: false,
      results: [],
      error: ""
    };
    this.addRecipe = addRecipe;
  }

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
    })

    
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
      /* 
      basicJSON = {
        id: 723984
        title: "Cabbage Salad with Peanuts"
        readyInMinutes: 15
        servings: 2
        image: "cabbage-salad-with-peanuts-723984.jpg"
        imageUrls: Array(1)
        0: "cabbage-salad-with-peanuts-723984.jpg" 
      }
      */


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
      /* 
      complexJSON = {
      vegetarian: true, vegan: true, glutenFree: true, dairyFree: true, veryHealthy: false, …}
      vegetarian: true
      vegan: true
      glutenFree: true
      dairyFree: true
      veryHealthy: false
      cheap: false
      veryPopular: true
      sustainable: false
      weightWatcherSmartPoints: 2
      gaps: "no"
      lowFodmap: false
      preparationMinutes: 5
      cookingMinutes: 0
      sourceUrl: "http://premeditatedleftovers.com/recipes-cooking-tips/the-fastest-easiest-crispiest-hash-browns-ever/"
      spoonacularSourceUrl: "https://spoonacular.com/the-fastest-easiest-crispiest-hash-browns-ever-532191"
      aggregateLikes: 1275
      spoonacularScore: 96
      healthScore: 23
      creditsText: "Premeditated Left Over"
      sourceName: "Premeditated Left Over"
      pricePerServing: 22.5
      id: 532191
      title: "The Fastest, Easiest, Crispiest Hash Browns Ever"
      readyInMinutes: 5
      servings: 8
      image: "https://spoonacular.com/recipeImages/532191-312x231.jpg"
      imageType: "jpg"
      summary: "The Fastest, Easiest, Crispiest Hash Browns Ever might be just the side dish you are searching for. This recipe makes 8 servings with <b>74 calories</b>, <b>3g of protein</b>, and <b>0g of fat</b> each. For <b>23 cents per serving</b>, this recipe <b>covers 8%</b> of your daily requirements of vitamins and minerals. Plenty of people made this recipe, and 1275 would say it hit the spot. Head to the store and pick up seasoned salt, onion, pepper, and a few other things to make it today. It is a good option if you're following a <b>gluten free, whole 30, and vegan</b> diet. From preparation to the plate, this recipe takes approximately <b>5 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 97%</b>. This score is great. Try <a href="https://spoonacular.com/recipes/hash-browns-with-ham-425689">Hash Browns with Ham</a>, <a href="https://spoonacular.com/recipes/hash-browns-40148">Hash Browns</a>, and <a href="https://spoonacular.com/recipes/zucchini-hash-browns-105587">Zucchini Hash Browns</a> for similar recipes."
      cuisines: Array(0)
      length: 0
      __proto__: Array(0)
      dishTypes: Array(1)
      0: "side dish"
      length: 1
      __proto__: Array(0)
      diets: Array(4)
      0: "gluten free"
      1: "dairy free"
      2: "lacto ovo vegetarian"
      3: "vegan"
      length: 4
      __proto__: Array(0)
      occasions: []
      winePairing: {}
      analyzedInstructions: [{…}]
      usedIngredientCount: 0
      missedIngredientCount: 3
      missedIngredients: Array(3)
      0:
        id: 11215
        amount: 4
        unit: "cloves"
        unitLong: "cloves"
        unitShort: "cloves"
        aisle: "Produce"
        name: "garlic"
        original: "4 cloves garlic"
        originalString: "4 cloves garlic"
        originalName: "garlic"
        metaInformation: []
        meta: []
        image: "https://spoonacular.com/cdn/ingredients_100x100/garlic.jpg"
        __proto__: Object
      1:
        id: 11282
        amount: 1
        unit: "medium"
        unitLong: "medium"
        unitShort: "medium"
        aisle: "Produce"
        name: "onion"
        original: "1 medium onion"
        originalString: "1 medium onion"
        originalName: "onion"
        metaInformation: Array(0)
        length: 0
        __proto__: Array(0)
        meta: []
        image: "https://spoonacular.com/cdn/ingredients_100x100/brown-onion.png"
        __proto__: Object
      2: {id: 11362, amount: 2, unit: "pounds", unitLong: "pounds", unitShort: "lb", …}
      length: 3
      __proto__: Array(0)
      likes: 0
      usedIngredients: Array(0)
      length: 0
      __proto__: Array(0)
      unusedIngredients: Array(0)
      length: 0
      __proto__: Array(0)
      __proto__: Object 
    }*/

    // const ingredientsJSON = await API.getRecipeInformationBulk()
    // res.data.status === "error" ? 
    // this.setState({error: res.data.message}) :

    // console.log([this.state.error])

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
          <h1 className="text-center"> Search By Recipe! </h1>
          <Alert style={alertCSS} type="danger"> {error} </Alert>
          <AdvancedSearchFilter />
          <RecipeSearchForm handleFormSubmit={handleFormSubmit} handleInputChange={searchQuery} />
          <RecipeSearchResults results={results} submitClicked={submitClicked} addRecipe={this.addRecipe} />
        </Container>
      </div>
    );
  }
};

export default AdvancedSearch;
