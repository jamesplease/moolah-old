import React from 'react';
import {Link} from 'react-router';
import {shallow} from 'enzyme';
import LandingPageHeader from '../../../../../client-src/common/components/landing-page-header';

describe('LandingPageHeader', function() {
  describe('rendering', () => {
    it('should be a header el with the right class', () => {
      const wrapper = shallow(<LandingPageHeader/>);
      expect(wrapper.type()).to.equal('header');
    });

    it('should have a link to the homepage', () => {
      const wrapper = shallow(<LandingPageHeader/>);
      const headerLink = wrapper.find('.appHeader-appLogo-Link');
      expect(headerLink.prop('to')).to.equal('/');
      expect(headerLink.prop('children')).to.equal('Moolah');
    });

    it('should have a link to login', () => {
      const wrapper = shallow(<LandingPageHeader/>);
      const linkContainer = wrapper.find('.landingPageHeader-buttonContainer');
      const headerLink = linkContainer.find(Link).at(0);
      expect(headerLink.prop('to')).to.equal('/login');
      expect(headerLink.prop('children')).to.equal('Log In');
    });

    it('should have a link to sign up', () => {
      const wrapper = shallow(<LandingPageHeader/>);
      const linkContainer = wrapper.find('.landingPageHeader-buttonContainer');
      const headerLink = linkContainer.find(Link).at(1);
      expect(headerLink.prop('to')).to.equal('/join');
      expect(headerLink.prop('children')).to.equal('Sign Up');
    });
  });
});
