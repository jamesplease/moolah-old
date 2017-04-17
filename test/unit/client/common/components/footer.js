import React from 'react';
import {Link} from 'react-router';
import {shallow} from 'enzyme';
import Footer from '../../../../../client/common/components/footer';

describe('Footer', function() {
  describe('rendering', () => {
    it('should be a footer el', () => {
      const wrapper = shallow(<Footer/>);
      expect(wrapper.type()).to.equal('footer');
    });

    describe('the copyright', () => {
      it('should have the right text', () => {
        const wrapper = shallow(<Footer/>);
        const copyright = wrapper.find('.footer-copyright');
        expect(copyright.text()).to.equal('Copyright © Moolah 2016. All rights reserved.');
      });
    });

    describe('the nav', () => {
      it('should render a nav el', () => {
        const wrapper = shallow(<Footer/>);
        expect(wrapper.find('nav')).to.have.length(1);
      });

      it('should have the right links', () => {
        const wrapper = shallow(<Footer/>);
        const links = wrapper.find(Link);
        expect(links).to.have.length(4);
        expect(links.at(0).prop('to')).to.equal('/terms');
        expect(links.at(1).prop('to')).to.equal('/privacy');
        expect(links.at(2).prop('to')).to.equal('/about');
        expect(links.at(3).prop('to')).to.equal('/contact');
      });
    });
  });
});
