import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Recipe Shopping List
      </Link>
      <div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              to="/search"
              className={window.location.pathname === "/search" ? "nav-link active" : "nav-link"}
            >
              Search
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/AdvancedSearch"
              className={window.location.pathname === "/AdvancedSearch" ? "nav-link active" : "nav-link"}
            >
              Advanced
            </Link>
          </li>
          {/* ******************************************************** */}
          {/* START Cody additions */}
          <li className="nav-item">
            <Link
              to="/login"
              className={window.location.pathname === "/login" ? "nav-link active" : "nav-link"}
            >
              Login
            </Link>
          </li>
          <li className="nav-item">
            <a href="http://localhost:3001/auth/google" >Logout</a>
            {/* <Link
              to="/logout"
              className={window.location.pathname === "/logout" ? "nav-link active" : "nav-link"}
            >
              Logout
            </Link> */}
          </li>
          {/* END Cody additions */}
          {/* ******************************************************** */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
