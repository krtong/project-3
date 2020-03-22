import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Users from "./pages/Users";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Discover from "./pages/Discover";
import About from "./pages/About";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import { UserContext } from "./context/UserContext";

function App() {
  const [users, setUsers] = useState([]);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      <Router>
        <div>
          <Navbar />
          <Nav />
          <Switch>
            <Route exact path="/" component={Users} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/users/:id" component={Detail} />
            <Route exact path="/" component={About} />
            <Route exact path="/about" component={About} />
            <Route exact path="/discover" component={Discover} />
            <Route exact path="/search" component={Search} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
