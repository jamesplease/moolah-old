import React from 'react';
import {shallow} from 'enzyme';
import Header from '../../../../../client/header/components/header';
import LoggedInHeader from '../../../../../client/header/components/logged-in-header';
import LandingPageHeader from '../../../../../client/header/components/landing-page-header';

describe('Header', function() {
  describe('rendering with a user', () => {
    it('should render the LoggedInHeader', () => {
      const props = {
        user: {
          id: 'asdf'
        }
      };
      const wrapper = shallow(<Header {...props}/>);
      expect(wrapper.type()).to.equal(LoggedInHeader);
    });
  });

  describe('rendering with no user', () => {
    it('should render the LandingPageHeader', () => {
      const props = {
        user: {}
      };
      const wrapper = shallow(<Header {...props}/>);
      expect(wrapper.type()).to.equal(LandingPageHeader);
    });
  });
});
