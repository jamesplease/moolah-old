import actionTypes from './action-types';

export function toggleMobileMenu(isMobileMenuVisible) {
  return {
    type: actionTypes.TOGGLE_MOBILE_MENU,
    isMobileMenuVisible
  };
}
