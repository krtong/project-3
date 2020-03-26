import React, {useContext, useEffect, useState} from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { LikeButton } from '../components/LikeButton';
import { UserContext } from "../context/UserContext";
import { RecipeContext } from "../context/RecipeContext";

const Books = () => {
  const [formData, setFormData] = useState({
    title: '',
    id: ''
  });
  const {recipes, setRecipes} = useContext(RecipeContext);

  const loadRecipes = () => {
    API.getUsers()
      .then(res => {
        
        console.log('res.data', res.data)
        console.log('res.data[0].recipes', res.data[0].recipes)
        setRecipes(res.data[0].recipes)
        console.log('recipes', recipes)
        console.log("setRecipes", setRecipes)
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
     if (recipes.length === 0) {
     loadRecipes();
     }
   }, []);

  const deleteBook = id => {
    API.deleteBook(id)
      .then(res => {
        const remainingBooks = recipes.filter(book => book._id !== id);
        setRecipes(remainingBooks);
      })
      .catch(err => console.log(err));
  };

  const incrementLikes = id => {
    console.log('id of book to increase likes', id, recipes);
    const indexToUpdate = recipes.findIndex(book => book._id === id);
    const newBooks = [...recipes];
    newBooks[indexToUpdate].likes = newBooks[indexToUpdate].likes ? newBooks[indexToUpdate].likes + 1 : 1;
    setRecipes(newBooks);

  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    })
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    
    const {id, title} = formData;
    //id and title are getting this far... error must be after here...
    console.log({id, title})
    
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
            {recipes.length ? (
              <List>
                {recipes.map(recipe => (
                  <ListItem key={recipe.id}>
                    {/* <LikeButton id={book._id} incrementLikes={incrementLikes} likes={book.likes | 0} /> */}
                    <Link to={"/users/" + recipe.id}>
                      <strong>
                        {recipe.title}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => deleteBook(recipe.id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
}

export default Books;
