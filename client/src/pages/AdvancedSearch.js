import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import RecipeSearchForm from "../components/RecipeSearchForm"
import RecipeSearchResults from "../components/RecipeSearchResults";
import AdvancedSearchFilter from "../components/AdvancedSearchFilter";
import Alert from "../components/Alert";


const fakedata = {
  "results": [
      {
          "vegetarian": false,
          "vegan": false,
          "glutenFree": true,
          "dairyFree": false,
          "veryHealthy": false,
          "cheap": false,
          "veryPopular": true,
          "sustainable": false,
          "weightWatcherSmartPoints": 16,
          "gaps": "no",
          "lowFodmap": false,
          "preparationMinutes": 8,
          "cookingMinutes": 20,
          "sourceUrl": "https://www.bbcgoodfood.com/recipes/2040646/chorizo-potato-and-cheese-omelette",
          "spoonacularSourceUrl": "https://spoonacular.com/chorizo-potato-cheese-omelette-211364",
          "aggregateLikes": 613,
          "spoonacularScore": 81.0,
          "healthScore": 17.0,
          "creditsText": "BBC Good Food",
          "sourceName": "BBC Good Food",
          "pricePerServing": 184.72,
          "id": 211364,
          "title": "Chorizo, potato & cheese omelette",
          "readyInMinutes": 28,
          "servings": 1,
          "image": "https://spoonacular.com/recipeImages/211364-312x231.jpg",
          "imageType": "jpg",
          "summary": "Chorizo, potato & cheese omelette might be a good recipe to expand your main course repertoire. This gluten free recipe serves 1 and costs <b>$1.85 per serving</b>. One portion of this dish contains about <b>30g of protein</b>, <b>33g of fat</b>, and a total of <b>509 calories</b>. This recipe from BBC Good Food requires potato, olive oil, chorizo, and eggs. From preparation to the plate, this recipe takes around <b>28 minutes</b>. 613 people have made this recipe and would make it again. All things considered, we decided this recipe <b>deserves a spoonacular score of 82%</b>. This score is great. <a href=\"https://spoonacular.com/recipes/potato-chorizo-omelette-recipe-with-kinda-parsley-salad-78712\">Potato & Chorizo Omelette Recipe (with Kinda Parsley Salad)</a>, <a href=\"https://spoonacular.com/recipes/spinach-goat-cheese-chorizo-omelette-977218\">Spinach, Goat Cheese & Chorizo Omelette</a>, and <a href=\"https://spoonacular.com/recipes/chorizo-omelette-605690\">Chorizo Omelette</a> are very similar to this recipe.",
          "cuisines": [],
          "dishTypes": [
              "lunch",
              "main course",
              "morning meal",
              "brunch",
              "main dish",
              "breakfast",
              "dinner"
          ],
          "diets": [
              "gluten free"
          ],
          "occasions": [],
          "winePairing": {
              "pairedWines": [
                  "sparkling wine"
              ],
              "pairingText": "Omelet on the menu? Try pairing with Sparkling Wine. Even if you aren't making mimosas, sparkling wine is great with eggs for two reasons. One, if you're eating eggs early in the day, sparkling wine has less alcohol. Secondly, it cleanses the palate, which is important since yolk is known to coat the palate. The Shingleback Black Bubbles Sparkling Shiraz with a 4.5 out of 5 star rating seems like a good match. It costs about 23 dollars per bottle.",
              "productMatches": [
                  {
                      "id": 450729,
                      "title": "Shingleback Black Bubbles Sparkling Shiraz",
                      "description": "Deep garnet in color with vibrant magenta bubbles. Aromas of concentrated blackcurrant with hints of licorice, spice and dark cherries. Creamy bubbles and luscious sweetness envelop the plump blackberry mid-palate, which is enhanced with hints of savory development. The long sweet fruit finish is balanced with fine tannin and acidity.\nThis is a non-vintage wine blended from a number of years of Shiraz to create complexity and consistency in the style.",
                      "price": "$22.99",
                      "imageUrl": "https://spoonacular.com/productImages/450729-312x231.jpg",
                      "averageRating": 0.9,
                      "ratingCount": 5.0,
                      "score": 0.8375,
                      "link": "https://click.linksynergy.com/deeplink?id=*QCiIS6t4gA&mid=2025&murl=https%3A%2F%2Fwww.wine.com%2Fproduct%2Fshingleback-black-bubbles-sparkling-shiraz%2F128396"
                  }
              ]
          },
          "analyzedInstructions": [
              {
                  "name": "",
                  "steps": [
                      {
                          "number": 1,
                          "step": "Cook the potato in boiling water for 8-10 mins or until tender.",
                          "ingredients": [
                              {
                                  "id": 11362,
                                  "name": "potato",
                                  "image": "potatoes-yukon-gold.png"
                              }
                          ],
                          "equipment": [],
                          "length": {
                              "number": 10,
                              "unit": "minutes"
                          }
                      },
                      {
                          "number": 2,
                          "step": "Drain and allow to steam-dry.",
                          "ingredients": [],
                          "equipment": []
                      },
                      {
                          "number": 3,
                          "step": "Heat oil in an omelette pan, add chorizo and cook for 2 mins.",
                          "ingredients": [
                              {
                                  "id": 99233,
                                  "name": "chorizo",
                                  "image": "chorizo.jpg"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 404645,
                                  "name": "frying pan",
                                  "image": "pan.png"
                              }
                          ],
                          "length": {
                              "number": 2,
                              "unit": "minutes"
                          }
                      },
                      {
                          "number": 4,
                          "step": "Add the potato and cook for a further 5 mins until the potato starts to crisp. Spoon pan contents out, wipe pan and cook a 2 or 3-egg omelette in the same pan. When almost cooked, scatter with the chorizo and potato, parsley and cheese. Fold the omelette in the pan and cook for 1 min more to melt the cheese.",
                          "ingredients": [
                              {
                                  "id": 99233,
                                  "name": "chorizo",
                                  "image": "chorizo.jpg"
                              },
                              {
                                  "id": 11297,
                                  "name": "parsley",
                                  "image": "parsley.jpg"
                              },
                              {
                                  "id": 1041009,
                                  "name": "cheese",
                                  "image": "cheddar-cheese.png"
                              },
                              {
                                  "id": 11362,
                                  "name": "potato",
                                  "image": "potatoes-yukon-gold.png"
                              },
                              {
                                  "id": 1123,
                                  "name": "egg",
                                  "image": "egg.png"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 404645,
                                  "name": "frying pan",
                                  "image": "pan.png"
                              }
                          ],
                          "length": {
                              "number": 6,
                              "unit": "minutes"
                          }
                      }
                  ]
              }
          ],
          "usedIngredientCount": 0,
          "missedIngredientCount": 5,
          "missedIngredients": [
              {
                  "id": 11362,
                  "amount": 1.0,
                  "unit": "small",
                  "unitLong": "small",
                  "unitShort": "small",
                  "aisle": "Produce",
                  "name": "potato",
                  "original": "1 small potato, cut into 2cm dice",
                  "originalString": "1 small potato, cut into 2cm dice",
                  "originalName": "potato, cut into 2cm dice",
                  "metaInformation": [
                      "cut into 2cm dice"
                  ],
                  "meta": [
                      "cut into 2cm dice"
                  ],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/potatoes-yukon-gold.png"
              },
              {
                  "id": 99233,
                  "amount": 50.0,
                  "unit": "g",
                  "unitLong": "grams",
                  "unitShort": "g",
                  "aisle": "Meat",
                  "name": "chorizo",
                  "original": "50g chorizo, chopped",
                  "originalString": "50g chorizo, chopped",
                  "originalName": "chorizo, chopped",
                  "metaInformation": [
                      "chopped"
                  ],
                  "meta": [
                      "chopped"
                  ],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/chorizo.jpg"
              },
              {
                  "id": 1123,
                  "amount": 2.0,
                  "unit": "",
                  "unitLong": "",
                  "unitShort": "",
                  "aisle": "Milk, Eggs, Other Dairy",
                  "name": "eggs",
                  "original": "2-3 eggs",
                  "originalString": "2-3 eggs",
                  "originalName": "eggs",
                  "metaInformation": [],
                  "meta": [],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/egg.png"
              },
              {
                  "id": 11297,
                  "amount": 1.0,
                  "unit": "serving",
                  "unitLong": "serving",
                  "unitShort": "serving",
                  "aisle": "Produce",
                  "name": "parsley",
                  "original": "chopped parsley",
                  "originalString": "chopped parsley",
                  "originalName": "chopped parsley",
                  "metaInformation": [
                      "chopped"
                  ],
                  "meta": [
                      "chopped"
                  ],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/parsley.jpg"
              },
              {
                  "id": 1009,
                  "amount": 25.0,
                  "unit": "g",
                  "unitLong": "grams",
                  "unitShort": "g",
                  "aisle": "Cheese",
                  "name": "cheddar",
                  "original": "25g grated cheddar",
                  "originalString": "25g grated cheddar",
                  "originalName": "grated cheddar",
                  "metaInformation": [
                      "grated"
                  ],
                  "meta": [
                      "grated"
                  ],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png"
              }
          ],
          "likes": 0,
          "usedIngredients": [],
          "unusedIngredients": []
      }
  ],
  "baseUri": "https://spoonacular.com/recipeImages/",
  "offset": 0,
  "number": 1,
  "totalResults": 25,
  "processingTimeMs": 652
}

const root = fakedata.results[0]
const title = root.title
const id = root.id
const image = root.image
const servingSize = root.servings
const cookingTime = root.readyInMinutes;
const sourceUrl = root.sourceUrl
const spoonacularSourceUrl = root.spoonacularSourceUrl;
const pricePerServing = root.pricePerServing;
const extendedIngredients = root.missedIngredients.map( ({name, aisle, amount, unit}) =>({name, aisle, amount, unit}))


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


                const extendedIngredients = JSON.stringify(root.analyzedInstructions, null, 2)
                return(
                <div>
                  <div>{title}</div>
                  <img src={image} />
                  <div>serving size: {servingSize}</div>
                  <div>cooking time: {cookingTime}</div>
                  <div><a href={sourceUrl}>Link to recipe</a></div>
                  <div>Price per serving: ${pricePerServing}</div>
                  <div>Diet: {diet} </div>
                  <div>{extendedIngredients}</div>
                </div>
                )
            }))}
          </div>
        </Container>
      </div>
    );
  }
};

export default AdvancedSearch;
