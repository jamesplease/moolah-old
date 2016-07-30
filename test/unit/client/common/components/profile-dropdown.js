import React from 'react';
import {shallow} from 'enzyme';
import {Link} from 'react-router';
import ProfileDropdown from '../../../../../client-src/common/components/profile-dropdown';
import DropdownOverlay from '../../../../../client-src/common/components/dropdown-overlay';

describe('ProfileDropdown', function() {
  beforeEach(() => {
    this.closeDropdown = stub();
  });

  describe('rendering', () => {
    it('should render the dropdown and the overlay', () => {
      const wrapper = shallow(<ProfileDropdown/>);
      expect(wrapper.find('.profileDropdown')).to.have.length(1);
      expect(wrapper.find(DropdownOverlay)).to.have.length(1);
    });

    describe('the dropdown: first link', () => {
      it('should have the right class', () => {
        const wrapper = shallow(<ProfileDropdown closeDropdown={this.closeDropdown}/>);
        const dropdownLink = wrapper.find(Link);
        expect(dropdownLink.hasClass('profileDropdown-link')).to.be.true;
      });

      it('should pass `closeDropdown` as `onClick`', () => {
        const wrapper = shallow(<ProfileDropdown closeDropdown={this.closeDropdown}/>);
        const dropdownLink = wrapper.find(Link);
        expect(dropdownLink.prop('onClick')).to.equal(this.closeDropdown);
      });

      it('should have the right `to` prop', () => {
        const wrapper = shallow(<ProfileDropdown closeDropdown={this.closeDropdown}/>);
        const dropdownLink = wrapper.find(Link);
        expect(dropdownLink.prop('to')).to.equal('/account');
      });

      it('should have an icon', () => {
        const wrapper = shallow(<ProfileDropdown closeDropdown={this.closeDropdown}/>);
        const dropdownLink = wrapper.find(Link);
        expect(dropdownLink.find('.profileDropdown-icon')).to.have.length(1);
      });
    });

    describe('the dropdown: second link', () => {
      it('should have the right class', () => {
        const wrapper = shallow(<ProfileDropdown closeDropdown={this.closeDropdown}/>);
        const dropdownLink = wrapper.find('a');
        expect(dropdownLink.hasClass('profileDropdown-link')).to.be.true;
      });

      it('should have the right text', () => {
        const wrapper = shallow(<ProfileDropdown closeDropdown={this.closeDropdown}/>);
        const dropdownLink = wrapper.find('a');
        expect(dropdownLink.text()).to.equal('Sign out');
      });

      it('should have the right `to` prop', () => {
        const wrapper = shallow(<ProfileDropdown closeDropdown={this.closeDropdown}/>);
        const dropdownLink = wrapper.find('a');
        expect(dropdownLink.prop('href')).to.equal('/logout');
      });

      it('should have an icon', () => {
        const wrapper = shallow(<ProfileDropdown closeDropdown={this.closeDropdown}/>);
        const dropdownLink = wrapper.find('a');
        expect(dropdownLink.find('.profileDropdown-icon')).to.have.length(1);
      });
    });

    describe('the overlay', () => {
      it('should pass the `closeDropdown` prop as the `onClick` prop', () => {
        const wrapper = shallow(<ProfileDropdown closeDropdown={this.closeDropdown}/>);
        const overlay = wrapper.find(DropdownOverlay);
        expect(overlay.prop('onClick')).to.equal(this.closeDropdown);
      });
    });
  });
});
