import React from "react";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
 
function NavBar() {
  return (
    <div className="nav">
      <ul>
        <li>
          <NavLink exact to="/settings" activeClass="active">
            <FontAwesomeIcon icon={faCogs} />
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/" activeClass="active">
            <FontAwesomeIcon icon={faHouse} />
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/profile" activeClass="active">
            <FontAwesomeIcon icon={faUser} />
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;