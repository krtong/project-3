import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Discover from "./pages/Discover";
import About from "./pages/About";
import Search from "./pages/Search";
import RecipeSearch from "./pages/RecipeSearch"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import { BookContext } from './context/BookContext';

function App() {
  const [books, setBooks] = useState([]);

  return (
    <BookContext.Provider value={{ books, setBooks }}>
    <Router>
      <div>
        <Navbar />
        <Nav />
        <Switch>
          <Route exact path="/" component={Books} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/books/:id" component={Detail} />
          <Route exact path="/" component={About} />
          <Route exact path="/about" component={About} />
          <Route exact path="/discover" component={Discover} />
          <Route exact path="/search" component={RecipeSearch} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
    </BookContext.Provider>
  );
}

export default App;
