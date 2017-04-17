import React from 'react';
import {shallow} from 'enzyme';
import NotFound from '../../../../../client/common/components/not-found';

describe('NotFound', function() {
  describe('rendering', () => {
    it('should have the right text', () => {
      const wrapper = shallow(<NotFound/>);
      expect(wrapper.text()).to.equal('Not found – sorry!');
    });
  });
});
