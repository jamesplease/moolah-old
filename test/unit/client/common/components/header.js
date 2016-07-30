import React from 'react';
import {shallow} from 'enzyme';
import Header from '../../../../../client-src/common/components/header';
import LoggedInHeader from '../../../../../client-src/common/components/logged-in-header';
import LandingPageHeader from '../../../../../client-src/common/components/landing-page-header';

describe('Header', function() {
  describe('rendering with a user', () => {
    it('should render the LoggedInHeader', () => {
      const props = {
        user: {}
      };
      const wrapper = shallow(<Header {...props}/>);
      expect(wrapper.type()).to.equal(LoggedInHeader);
    });
  });

  describe('rendering with no user', () => {
    it('should render the LandingPageHeader', () => {
      const props = {
        user: null
      };
      const wrapper = shallow(<Header {...props}/>);
      expect(wrapper.type()).to.equal(LandingPageHeader);
    });
  });
});
