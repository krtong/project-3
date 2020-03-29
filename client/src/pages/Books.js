import React, { useContext, useEffect, useState } from "react";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { UserContext } from "../context/UserContext";
import AdvancedRecipeSearch from "../pages/AdvancedSearch";


const Books = () => {
  //setState: user: "" / groceryList:[] / recipes:[]
  const { user, setUser } = useContext(UserContext);
  const [groceryList, setGroceryList] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const defaultUser = "Guest";

  const loadRecipes = async () => {
    try {
    const { data } = await API.getUser(user || defaultUser);
    const { groceryList: grocertListFromAPI, recipes: recipeListFromAPI } = data; //and this will be blank.
    setGroceryList(grocertListFromAPI);
    setRecipes(recipeListFromAPI);
    } catch (err) {
      console.log({err, user});
    }
  };

  //runs on user state changes
  useEffect(() => {
    setUser(user);
    loadRecipes();
  }, [user]);

  //[+]Recipe button onClick:
  const addRecipe = recipe => {
    const newIngredients = recipe["ingredients"];
    console.log({ newIngredients });
    let newGroceryList = [...groceryList];

    newIngredients.forEach(newItem => {
      for (let i = 0; i < newGroceryList.length; i++) {
        let oldItem = newGroceryList[i];
        //if ingredients don't already exist, push them to the end of array.
        if (i + 1 === newGroceryList.length && newItem.id !== oldItem.id) return newGroceryList.push(newItem);
        //else if ingredients do exist, add to the amount.
        else if (newItem.id === oldItem.id) return (newGroceryList[i].amount += newItem.amount);
      }
    });

    // if the 
    if (newGroceryList.length === 0) {
      newIngredients.forEach(ingredient => newGroceryList.push(ingredient));
    };

    //sort newGroceryList by aisle
    newGroceryList.sort((a, b) => {
      if (a.aisle === b.aisle) {
        return a.name > b.name ? 1 : 0;
      } else return a.aisle > b.aisle ? 1 : -1;
    });
    
    API.updateUser(user || defaultUser, {
      groceryList: newGroceryList,
      recipes: [...recipes, recipe]
    });

    setGroceryList(newGroceryList);
    setRecipes([...recipes, recipe]);
  };


  const deleteRecipe = recipe => {
    let ingredients = recipe["ingredients"];

    //remove ingredients from groceryList
    groceryList.forEach((item, idx) => {
      for (let i = 0; i < ingredients.length; i++) {
        const newItem = ingredients[i];
        if (item.id === newItem.id) {
          groceryList[idx].amount -= newItem.amount;
        }
      }
    });
    groceryList = groceryList.filter(({ amount }) => amount > 0);

    //remove recipe from recipeList
    recipes = recipes.filter(({ id }) => id !== recipe.id);
    API.updateUser(user, { groceryList, recipes });

    setGroceryList(groceryList);
    setRecipes(recipes);
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <AdvancedRecipeSearch
            addRecipe={addRecipe}
            deleteRecipe={deleteRecipe}
            user={user || defaultUser}
          />
        </Col>
        <Col size="md-6 sm-12">
          <table class="table table-sm table-dark">
            <thead>
              <tr>
                <th scope="col">x</th>
                <th scope="col">recipe</th>
                <th scope="col">ingredients</th>
                <th scope="col">servings</th>
              </tr>
            </thead>
            <tbody>
              {recipes &&
                recipes.map((recipe, idx) => {
                  const {diets,ingredients,id,title,readyInMinutes,servings,imageURL,recipeUrl} = recipe;
                  return (
                    <tr>
                      <th scope="row">
                        <a onClick={() => deleteRecipe(recipe)}>x</a>
                      </th>
                      <td>
                        <a href={recipeUrl} target="_blank">
                          {title}
                        </a>
                      </td>
                      <td>
                        ({ingredients && ingredients.length}){" "}
                        {ingredients &&
                          ingredients.map(({ name }) => name).join(", ")}
                      </td>
                      <td>{servings}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <table class="table table-sm table-dark">
            <thead>
              <tr>
                <th scope="col">🍑</th>
                <th scope="col">name</th>
                <th scope="col">aisle</th>
                <th scope="col">amount</th>
              </tr>
            </thead>
            <tbody>
              {groceryList &&
                groceryList.map(({ name, amount, aisle, unitLong, image }) => (
                  <tr>
                    <th scope="row">
                      <img
                        src={image}
                        style={{ width: "30px", height: "30px" }}
                      />
                    </th>
                    <td colspan="1">{name}</td>
                    <td>{aisle}</td>
                    <td>
                      {amount} {unitLong}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default Books