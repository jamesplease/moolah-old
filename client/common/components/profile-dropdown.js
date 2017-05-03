import React, {Component} from 'react';
import {Link} from 'react-router';
import xhr from 'xhr';
import ReactCSSTransitionGroup from '../../vendor/css-transition-group';
import defaultXhrHeaders from '../utils/default-xhr-headers';
import DropdownOverlay from './dropdown-overlay';

export default class ProfileDropdown extends Component {
  render() {
    const {closeDropdown} = this.props;
    const {displayDropdown} = this.state;

    return (
      <ReactCSSTransitionGroup
        transitionName="profileDropdown"
        transitionAppear={true}
        transitionAppearTimeout={130}
        transitionEnterTimeout={130}
        transitionLeaveTimeout={130}>
        {displayDropdown && (
          <div className="profileDropdown_container">
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
        )}
      </ReactCSSTransitionGroup>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      displayDropdown: props.isOpen
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.state.displayDropdown) {
      this.setState({
        displayDropdown: nextProps.isOpen
      });
    }
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
