import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
 
function nav() {
  return (
    <div className="nav">
      <ul>
        <li><a href='#'>
            <FontAwesomeIcon icon={faCogs} />
          </a>
        </li>
        <li><a href="#">Hog</a></li>
        <li><a href="#">Profile</a></li>
      </ul>
    </div>
  );
}

export default nav;