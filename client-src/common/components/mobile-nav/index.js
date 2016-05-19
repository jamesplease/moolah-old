import yo from 'yo-yo';
import classNames from 'classnames';
import Nav from '../nav';
import store from '../../../redux/store';

export default () => {
  const uiState = store.getState().ui;
  const isMobileMenuVisible = uiState.isMobileMenuVisible;

  const mobileNavClass = classNames({
    'mobile-nav': true,
    visible: isMobileMenuVisible
  });

  return yo`
    <div className="${mobileNavClass}">
      ${Nav()}
    </div>
  `;
};
