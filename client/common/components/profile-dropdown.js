import React, {Component} from 'react';
import {Link} from 'react-router';
import xhr from 'xhr';
import defaultXhrHeaders from '../services/default-xhr-headers';
import DropdownOverlay from './dropdown-overlay';

export default class ProfileDropdown extends Component {
  render() {
    const {closeDropdown} = this.props;

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
            <form
              acceptCharset="UTF-8"
              action="/logout"
              method="post"
              ref={(ref) => {this.form = ref;}}
              onSubmit={this.onSubmit}>
              <button type="submit" className="profileDropdown-link profileDropdown-btn">
                <i className="zmdi zmdi-power profileDropdown-icon"/>
                Sign out
              </button>
            </form>
          </li>
        </ul>
        <DropdownOverlay onClick={closeDropdown}/>
      </div>
    );
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.form) {
      return;
    }

    const action = this.form.getAttribute('action');

    xhr.post(action, {
      headers: {...defaultXhrHeaders}
    }, (err) => {
      if (err) {
        // Intentionally blank. I need to show an alert, or something.
        return;
      }

      location.href = '/login';
    });
  }
}
