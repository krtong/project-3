import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import RecipeSearch from "./pages/RecipeSearch";
import AdvancedSearch from "./pages/AdvancedSearch";
import Navbar from "./components/Navbar";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import Nav from "./components/Nav";
import { BookContext } from './context/BookContext';

function App() {

  const [books, setBooks] = useState([]);
  return (
    <BookContext.Provider value={{ books, setBooks }}>

    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Books} />
          <Route exact path="/search" component={RecipeSearch} />
          <Route exact path="/AdvancedSearch" component={AdvancedSearch} />
          <Route exact path="/" component={Books} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/books/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
    </BookContext.Provider>

  );
}

export default App;



