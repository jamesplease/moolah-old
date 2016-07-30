import React from 'react';
import {shallow} from 'enzyme';
import DropdownOverlay from '../../../../../client-src/common/components/dropdown-overlay';

describe('DropdownOverlay', function() {
  describe('rendering with no `onClick` prop', () => {
    beforeEach(() => {
      this.onClick = stub();
      this.wrapper = shallow(<DropdownOverlay onClick={this.onClick}/>);
    });

    it('should have the right class', () => {
      expect(this.wrapper.hasClass('dropdownOverlay')).to.be.true;
    });

    it('should call `onClick` when clicked', () => {
      this.wrapper.simulate('click');
      expect(this.onClick).to.have.been.calledOnce;
    });
  });

  describe('rendering with no `onClick` prop', () => {
    beforeEach(() => {
      this.wrapper = shallow(<DropdownOverlay/>);
    });

    it('should have the right class', () => {
      expect(this.wrapper.hasClass('dropdownOverlay')).to.be.true;
    });
  });
});
