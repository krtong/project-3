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

const Books = () => {
  const [formData, setFormData] = useState({
    title: "",
    id: "",
    _id: "5e7ad9605383035a44651616"
  });
  const { users, setUsers } = useContext(UserContext);
  const { recipes, setRecipes } = useContext(RecipeContext);
  console.log(users);

  const loadRecipes = () => {
    API.getUsers()
      .then(res => {
        const usersArray = res.data;
        console.log('hi')
        console.log("res.data", res.data);
        setRecipes(usersArray);
      })
      .catch(err => console.log("hi"));
  };

  // useEffect(() => {
  //    if (recipes.length === 0) {
  //    loadRecipes();
  //    }
  //  }, []);

  const deleteBook = id => {
    API.deleteBook(id)
      .then(res => {
        const remainingBooks = users.filter(user => user._id !== id);
        setRecipes(remainingBooks);
      })
      .catch(err => console.log(err));
  };

  const incrementLikes = id => {
    console.log("id of book to increase likes", id, users);
    const indexToUpdate = users.findIndex(user => user._id === id);
    const newBooks = [...users];
    newBooks[indexToUpdate].likes = newBooks[indexToUpdate].likes
      ? newBooks[indexToUpdate].likes + 1
      : 1;
    setRecipes(newBooks);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    const { id, title } = formData;
    //id and title are getting this far... error must be after here... 🌭
    console.log({ id, title });

    if (title && id) {
      API.saveRecipe({
        title,
        id
      })
        .then(res => loadRecipes())
        .catch(err => console.log(err));
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <Jumbotron>
            <h1>What Books Should I Read?</h1>
          </Jumbotron>
          <form>
            <Input
              value={formData.title}
              onChange={handleInputChange}
              name="title"
              placeholder="Recipe Title (required)"
            />
            <Input
              value={formData.id}
              onChange={handleInputChange}
              name="id"
              placeholder="Recipe ID (required)"
            />
            <FormBtn
              disabled={!(formData.title && formData.id)}
              onClick={handleFormSubmit}
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
};

export default Books;
