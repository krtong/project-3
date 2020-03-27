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


export default class Books extends React.Component {
  constructor(){
    super();
    this.state = {
      title: '',
      id: "",
      userID: 1,
    }
   this.loadRecipes()
  }
  
   loadRecipes = async() => {
     try{
       console.log("TEST")
      const res = await API.getRecipes()
      const usersArray = res;
      console.log("TESTING")
      console.log({usersArray})
     }
     catch(err){
       console.log(err)
     }
      // this.setState(usersArray)

  };

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
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Recipe Title (required)"
                />
              <Input
                value={this.state.id}
                onChange={this.handleInputChange}
                name="id"
                placeholder="Recipe ID (required)"
                />
              <FormBtn
                disabled={!(this.state.title && this.state.id)}
                onClick={this.handleFormSubmit}
                >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {/* {recipes.length ? (
              <List>
              {users.map(user => {
                console.log("user", user);
                return(
                  <ListItem key={user._id}>
                  <LikeButton id={user._id} incrementLikes={incrementLikes} likes={user.likes | 0} />
                  <Link to={"/users/" + user._id}>
                  <strong>
                  {user.title} by {user.id}
                  </strong>
                  </Link>
                  <DeleteBtn onClick={() => deleteBook(user._id)} />
                  </ListItem>
                  )
                }
                )}
                </List>
            ) : (
              <h3>No Results to Display</h3>
            )} */}

          </Col>
        </Row>
      </Container>
    );
  }
}
