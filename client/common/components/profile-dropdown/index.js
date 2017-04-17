import React from 'react';
import {Link} from 'react-router';
import DropdownOverlay from '../dropdown-overlay';

export default function ProfileDropdown({closeDropdown}) {
  return (
    <div>
      <ul className="profileDropdown">
        <li className="profileDropdown-listItem">
          <Link
            to="/account"
            className="profileDropdown-link"
            onClick={closeDropdown}>
            <i className="zmdi zmdi-account profileDropdown-icon"/>
            Account settings
          </Link>
        </li>
        <li className="profileDropdown-listItem">
          <a href="/logout" className="profileDropdown-link">
            <i className="zmdi zmdi-power profileDropdown-icon"/>
            Sign out
          </a>
        </li>
      </ul>
      <DropdownOverlay onClick={closeDropdown}/>
    </div>
  );
}
