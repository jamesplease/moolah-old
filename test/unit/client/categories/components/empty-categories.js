import React from 'react';
import {shallow} from 'enzyme';
import EmptyCategories from '../../../../../client-src/categories/components/empty-categories';

describe('EmptyCategories', function() {
  describe('rendering', () => {
    beforeEach(() => {
      this.wrapper = shallow(<EmptyCategories/>);
    });

    it('should have the right class name', () => {
      expect(this.wrapper.hasClass('emptyResourceList')).to.be.true;
    });

    it('should have a message with the right text', () => {
      const message = this.wrapper.find('.emptyResourceList-message');
      expect(message.text()).to.equal('There are no categories.');
    });

    it('should have an explanation with the right text', () => {
      const explanation = this.wrapper.find('.emptyResourceList-explanation');
      const text = 'This page will list categories that you create. Related transactions can be grouped together using categories.';
      expect(explanation.text()).to.equal(text);
    });
  });
});
