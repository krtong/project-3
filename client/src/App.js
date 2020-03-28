import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import RecipeSearch from "./pages/RecipeSearch";
import AdvancedSearch from "./pages/AdvancedSearch";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { Books } from "./pages/Books";
import Detail from "./pages/Detail";
import { UserContext } from './context/UserContext';
import { Base64 } from 'js-base64';
import { useCookies } from 'react-cookie';


function App() {

  const [user, setUser] = useState("");

  const [cookies] = useCookies([]);

  useEffect(() => {
      console.log('cookies', cookies)
      if (cookies['express:sess']) {
          const cookieData = JSON.parse(Base64.decode(cookies['express:sess']));
          setUser(cookieData.passport.user);
      }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>

    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Books} />
          <Route exact path="/AdvancedSearch" component={AdvancedSearch} />
          <Route exact path="/login" component={Login}/>
          {/* <Route exact path="/auth/google" component={() => "WORKING ALMOST KIND OF"}/> */}
          <Route exact path="/search" component={RecipeSearch} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/books/:id" component={Detail} />


          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
    </UserContext.Provider>

  );
}

export default App;



