import React, { useContext, useEffect, useState } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { LikeButton } from "../components/LikeButton";
import { UserContext } from "../context/UserContext";
import { RecipeContext } from "../context/RecipeContext";
import AdvancedRecipeSearch from "../pages/AdvancedSearch";

export default class Books extends React.Component {
  constructor(){
    super();
    this.state = {
      title: '',
      id: "",
      userID: 1,
    }
  //  this.loadRecipes()
  }
  
  loadRecipes = async() => {
    try{
      const { data } = await API.getUsers();
      const  { groceryList, recipes } = data.filter(user => user.userID === this.state.userID)[0];

      let ingredientsArray = []
      recipes.forEach(({ingredients}) => ingredients.forEach(ingredient => ingredientsArray.push(ingredient)));

      this.setState({ groceryList , recipes, ingredients: ingredientsArray});
     }
     catch(err){
       console.log(err)
     }
    }
    componentDidMount(){
      this.loadRecipes();
    }
    addRecipe =  (recipe) => {
      
        const groceryList = this.state.groceryList
        const newIngredients =  recipe["ingredients"];
        console.log({newIngredients})

        if (newIngredients) {
          newIngredients.forEach(newItem => {
            for (let i = 0; i < groceryList.length; i++){
              let oldItem = groceryList[i];
              if (i+1 === groceryList.length && newItem.id !== oldItem.id) return groceryList.push(newItem); 
              else if (newItem.id === oldItem.id) return groceryList[i].amount += newItem.amount;
            }
          })
        }

        this.setState({groceryList, recipes: [recipe, ...this.state.recipes]})
    }

  // useEffect(() => {
  //    if (recipes.length === 0) {
  //    loadRecipes();
  //    }
  //  }, []);


  //  deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => {
  //       const remainingBooks = users.filter(user => user._id !== id);
  //       setRecipes(remainingBooks);
  //     })
  //     .catch(err => console.log(err));
  // };

  //  incrementLikes = id => {
  //   console.log('id of book to increase likes', id, users);
  //   const indexToUpdate = users.findIndex(user => user._id === id);
  //   const newBooks = [...users];
  //   newBooks[indexToUpdate].likes = newBooks[indexToUpdate].likes ? newBooks[indexToUpdate].likes + 1 : 1;
  //   setRecipes(newBooks);
  // }


   handleInputChange = event => {
    const { name, value } = event.target;
    // console.log("books.js", {name, value});
    this.setState({
      ...this.state,
      [name]: value
    })
    console.log("this state", this.state)
  };

  //  handleFormSubmit = event => {
  //   event.preventDefault();
    
  //   const {id, title} = formData;
  //   //id and title are getting this far... error must be after here... 🌭
  //   console.log({id, title})
    
  //  if (title && id) {
  //     API.saveRecipe({
  //       title,
  //       id
  //     })
  //       .then(res => loadRecipes())
  //       .catch(err => console.log(err));
  //   }
  // };
  render(){

  return (
    <Container fluid>
        <Row>
          <Col size="md-6">

            <AdvancedRecipeSearch addRecipe={this.addRecipe}/>

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
                {this.state.recipes && this.state.recipes.map(({diets, ingredients, id, title, readyInMinutes, servings, imageURL, recipeUrl}) => (
                <tr>
                  <th scope="row"><a onClick={() => console.log(`delete recipe-${id} recipe list`)}>[X]</a></th>
                  <td>{title}</td>
                <td>({ingredients && ingredients.length}) {ingredients && ingredients.map(({name}) => name).join(', ')}</td>
                  <td>{servings}</td>
                </tr>))}
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
                {this.state.groceryList && this.state.groceryList.map(({name, amount, aisle, unitLong, image}) => (
                <tr>
                  <th scope="row"><img src={image} style={{width: "30px", height: "30px"}} /></th>
                  <td colspan="1">{name}</td>
                  <td>{aisle}</td>
                  <td>{amount} {unitLong}</td>
                </tr> ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    );
  }
}
