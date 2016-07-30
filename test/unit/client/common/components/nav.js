import React from 'react';
import {Link} from 'react-router';
import {shallow} from 'enzyme';
import Nav from '../../../../../client-src/common/components/nav';

describe('Nav', function() {
  beforeEach(() => {
    this.toggleOverlayNav = stub();
    this.defaultProps = {
      toggleOverlayNav: this.toggleOverlayNav,
      isOverlayNavVisible: false
    };
  });

  describe('rendering', () => {
    describe('the nav', () => {
      it('should contain a nav el', () => {
        const wrapper = shallow(<Nav {...this.defaultProps}/>);
        expect(wrapper.find('nav')).to.have.length(1);
      });
    });

    describe('the overlay', () => {
      it('should not contain an overlay when it is not visible', () => {
        const wrapper = shallow(<Nav {...this.defaultProps}/>);
        expect(wrapper.find('.overlayNav')).to.have.length(0);
      });

      it('should contain an overlay when it is visible', () => {
        const props = {
          ...this.defaultProps,
          isOverlayNavVisible: true
        };
        const wrapper = shallow(<Nav {...props}/>);
        expect(wrapper.find('.overlayNav')).to.have.length(1);
      });
    });
  });
});
