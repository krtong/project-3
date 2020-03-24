import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NoMatch from "./pages/NoMatch";
import RecipeSearch from "./pages/RecipeSearch";
import AdvancedSearch from "./pages/AdvancedSearch";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

function App() {

  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={() => 'hello world'} />
          <Route exact path="/search" component={RecipeSearch} />
          <Route exact path="/AdvancedSearch" component={AdvancedSearch} />
          <Route exact path="/login" component={Login}/>
          {/* <Route exact path="/auth/google" component={() => "WORKING ALMOST KIND OF"}/> */}
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
