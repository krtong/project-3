import React, {useContext} from "react";
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

function Nav() {
  const { users } = useContext(UserContext);

  const calcTotalLikes = () => {
    return users.reduce((totalLikes, user) => {
      return user.likes ? user.likes + totalLikes : totalLikes;
    }, 0);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            React Reading List
          </Link>
        </div>
        <div className="nav navbar-nav navbar-right text-white">Total Likes: {calcTotalLikes()}</div>
      </div>
    </nav>
  );
}

export default Nav;
