import React, {useContext, useEffect, useState} from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { LikeButton } from '../components/LikeButton';
import { UserContext } from '../context/UserContext';

const Users = () => {
  const [formData, setFormData] = useState({
    author: '',
    synopsis: '',
    title: ''
  });
  const {users, setUsers} = useContext(UserContext);

  const loadUsers = () => {
    API.getUsers()
      .then(res => {
        console.log('res.data', res.data)
        setUsers(res.data)
      }
      )
      .catch(err => console.log(err));
  };

  useEffect(() => {
     if (users.length === 0) {
     loadUsers();
     }
   }, []);

  const deleteUser = id => {
    API.deleteUser(id)
      .then(res => {
        const remainingUsers = users.filter(user => user._id !== id);
        setUsers(remainingUsers);
      })
      .catch(err => console.log(err));
  };

  const incrementLikes = id => {
    console.log('id of user to increase likes', id, users);
    const indexToUpdate = users.findIndex(user => user._id === id);
    const newUsers = [...users];
    newUsers[indexToUpdate].likes = newUsers[indexToUpdate].likes ? newUsers[indexToUpdate].likes + 1 : 1;
    setUsers(newUsers);

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
    
    const {author, synopsis, title} = formData;

    if (title && author) {
      API.saveUser({
        author,
        likes: 0,
        synopsis,
        title
      })
        .then(res => loadUsers())
        .catch(err => console.log(err));
    }
  };

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Users Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={formData.title}
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={formData.author}
                onChange={handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                value={formData.synopsis}
                onChange={handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              />
              <FormBtn
                disabled={!(formData.author && formData.title)}
                onClick={handleFormSubmit}
              >
                Submit User
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Users On My List</h1>
            </Jumbotron>
            {users.length ? (
              <List>
                {users.map(user => (
                  <ListItem key={user._id}>
                    <LikeButton id={user._id} incrementLikes={incrementLikes} likes={user.likes | 0} />
                    <Link to={"/users/" + user._id}>
                      <strong>
                        {user.title} by {user.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => deleteUser(user._id)} />
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

export default Users;
