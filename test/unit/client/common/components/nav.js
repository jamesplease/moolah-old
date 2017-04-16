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

  describe('clicking a link', () => {
    it('should not call toggleOverlayNav when isOverlayNavVisible is false', () => {
      const wrapper = shallow(<Nav {...this.defaultProps}/>);
      const firstLink = wrapper.find(Link).at(0);
      const firstLinkOnClick = firstLink.prop('onClick');
      firstLinkOnClick();
      expect(this.toggleOverlayNav).to.not.have.been.called;
    });

    it('should call toggleOverlayNav when isOverlayNavVisible is false', () => {
      const props = {
        ...this.defaultProps,
        isOverlayNavVisible: true
      };
      const wrapper = shallow(<Nav {...props}/>);
      const firstLink = wrapper.find(Link).at(0);
      const firstLinkOnClick = firstLink.prop('onClick');
      firstLinkOnClick();
      expect(this.toggleOverlayNav).to.have.been.calledOnce;
    });
  });

  describe('rendering', () => {
    describe('the nav', () => {
      it('should contain a nav el', () => {
        const wrapper = shallow(<Nav {...this.defaultProps}/>);
        expect(wrapper.find('nav')).to.have.length(1);
      });

      it('should have the right class when isOverlayNavVisible is true', () => {
        const props = {
          ...this.defaultProps,
          isOverlayNavVisible: true
        };
        const wrapper = shallow(<Nav {...props}/>);
        const nav = wrapper.find('nav');
        expect(nav.hasClass('mainNav-overlayVisible')).to.be.true;
      });

      it('should contain the app links', () => {
        const wrapper = shallow(<Nav {...this.defaultProps}/>);
        const links = wrapper.find(Link);
        const linkListItems = wrapper.find('.mainNav-listItem');
        expect(links).to.have.length(3);
        expect(linkListItems).to.have.length(3);

        expect(links.at(0).prop('children')).to.equal('Dashboard');
        expect(links.at(0).prop('to')).to.equal('/');
        expect(linkListItems.at(0).hasClass('mainNav-listItem-smallScreenOnly')).to.be.true;

        expect(links.at(1).prop('children')).to.equal('Transactions');
        expect(links.at(1).prop('to')).to.equal('/transactions');
        expect(linkListItems.at(1).hasClass('mainNav-listItem-smallScreenOnly')).to.be.false;

        expect(links.at(2).prop('children')).to.equal('Categories');
        expect(links.at(2).prop('to')).to.equal('/categories');
        expect(linkListItems.at(2).hasClass('mainNav-listItem-smallScreenOnly')).to.be.false;
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
