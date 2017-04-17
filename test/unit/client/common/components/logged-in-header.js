import React from 'react';
import {Link} from 'react-router';
import {shallow} from 'enzyme';
import preventScroll from 'prevent-scroll';
import LoggedInHeader from '../../../../../client/common/components/logged-in-header';
import ProfileDropdown from '../../../../../client/common/components/profile-dropdown';
import Nav from '../../../../../client/common/components/nav';

describe('LoggedInHeader', function() {
  beforeEach(() => {
    stub(preventScroll);
  });

  it('should have the right class name', () => {
    const wrapper = shallow(<LoggedInHeader/>);
    expect(wrapper.hasClass('appHeader')).to.be.true;
  });

  it('should have a logo link', () => {
    const wrapper = shallow(<LoggedInHeader/>);
    const mainLink = wrapper.find('.appHeader-appLogo-Link');
    expect(mainLink.type()).to.equal(Link);
    expect(mainLink).to.have.length(1);
    expect(mainLink.prop('children')).to.equal('Moolah');
    expect(mainLink.prop('to')).to.equal('/');
  });

  describe('the nav', () => {
    // This is a big test, but it seems to makes the most sense to do it all together
    it('should pass down `isOverlayNavVisible`, and close it when the `toggleOverlayNav` prop is called', () => {
      const wrapper = shallow(<LoggedInHeader/>);
      let nav = wrapper.find(Nav);
      expect(nav).to.have.length(1);

      // This is false by default
      expect(nav.prop('isOverlayNavVisible')).to.equal(false);

      // Then it becomes true after the overlay toggle is clicked
      const overlayToggle = wrapper.find('.appHeader-overlayNavToggle');
      overlayToggle.simulate('click');
      wrapper.update();
      nav = wrapper.find(Nav);
      expect(nav.prop('isOverlayNavVisible')).to.equal(true);

      // Lastly, we call this to close it again
      const toggleOverlayNav = nav.prop('toggleOverlayNav');
      toggleOverlayNav();
      wrapper.update();
      nav = wrapper.find(Nav);
      expect(nav.prop('isOverlayNavVisible')).to.equal(false);
    });
  });

  describe('the account container', () => {
    it('should have the name of the user', () => {
      const wrapper = shallow(<LoggedInHeader/>);
      const userName = wrapper.find('.appHeader-userName');
      expect(userName.text()).to.equal('James S.');
    });

    it('should have the profile picture', () => {
      const wrapper = shallow(<LoggedInHeader/>);
      const profilePic = wrapper.find('.appHeader-profilePicture');
      expect(profilePic).to.have.length(1);
    });

    it('should not have the dropdown', () => {
      const wrapper = shallow(<LoggedInHeader/>);
      expect(wrapper.find(ProfileDropdown)).to.have.length(0);
    });

    it('should show the dropdown once the accountLink is clicked', () => {
      const wrapper = shallow(<LoggedInHeader/>);
      const accountLink = wrapper.find('.appHeader-accountLink');
      accountLink.simulate('click');
      wrapper.update();
      const profileDropdown = wrapper.find(ProfileDropdown);
      expect(profileDropdown).to.have.length(1);
      expect(profileDropdown.prop('closeDropdown')).to.equal(wrapper.instance().hideProfileDropdown);
    });

    it('should disable scroll when clicked', () => {
      const wrapper = shallow(<LoggedInHeader/>);
      const accountLink = wrapper.find('.appHeader-accountLink');
      accountLink.simulate('click');
      expect(preventScroll.on).to.have.been.calledOnce;
      expect(preventScroll.off).to.not.have.been.called;
    });

    it('should enable scrolling and hide the dropdown when `closeDropdown` prop is called', () => {
      const wrapper = shallow(<LoggedInHeader/>);
      const accountLink = wrapper.find('.appHeader-accountLink');
      accountLink.simulate('click');
      wrapper.update();
      wrapper.instance().hideProfileDropdown();
      wrapper.update();
      const profileDropdown = wrapper.find(ProfileDropdown);
      expect(profileDropdown).to.have.length(0);
      expect(preventScroll.off).to.have.been.calledOnce;
    });
  });

  describe('the overlay nav toggle btn', () => {
    it('should contain the hamburger-box', () => {
      const wrapper = shallow(<LoggedInHeader/>);
      const overlayToggle = wrapper.find('.appHeader-overlayNavToggle');
      const hamburger = overlayToggle.find('.hamburger-box');
      expect(hamburger).to.have.length(1);
    });

    it('should not have the active class', () => {
      const wrapper = shallow(<LoggedInHeader/>);
      const overlayToggle = wrapper.find('.appHeader-overlayNavToggle');
      expect(overlayToggle.hasClass('is-active')).to.be.false;
    });

    it('should toggle scrolling as its clicked', () => {
      const wrapper = shallow(<LoggedInHeader/>);
      const overlayToggle = wrapper.find('.appHeader-overlayNavToggle');
      overlayToggle.simulate('click');
      expect(preventScroll.on).to.have.been.calledOnce;
      expect(preventScroll.off).to.not.have.been.called;
      overlayToggle.simulate('click');
      expect(preventScroll.off).to.have.been.calledOnce;
      overlayToggle.simulate('click');
      expect(preventScroll.on).to.have.been.calledTwice;
    });

    it('should toggle active class as its clicked', () => {
      const wrapper = shallow(<LoggedInHeader/>);
      let overlayToggle = wrapper.find('.appHeader-overlayNavToggle');
      overlayToggle.simulate('click');
      wrapper.update();
      overlayToggle = wrapper.find('.appHeader-overlayNavToggle');
      expect(overlayToggle.hasClass('is-active')).to.be.true;
      overlayToggle.simulate('click');
      wrapper.update();
      overlayToggle = wrapper.find('.appHeader-overlayNavToggle');
      expect(overlayToggle.hasClass('is-active')).to.be.false;
    });
  });
});
