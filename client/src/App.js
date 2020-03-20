import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import { BookContext } from './context/BookContext';
import Login from './components/Login'

function App() {
  const [books, setBooks] = useState([]);

  return (
    <Login></Login>
    // <BookContext.Provider value={{ books, setBooks }}>
    // <Router>
    //   <div>
    //     <Nav />
    //     <Switch>
    //       <Route exact path="/" component={Books} />
    //       <Route exact path="/books" component={Books} />
    //       <Route exact path="/books/:id" component={Detail} />
    //       <Route component={NoMatch} />
    //     </Switch>
    //   </div>
    // </Router>
    // </BookContext.Provider>
  );
}

export default App;
