import React from 'react';
import {shallow} from 'enzyme';
import LoadingIndicator from '../../../../../client/common/components/loading-indicator';

describe('LoadingIndicator', function() {
  describe('rendering', () => {
    it('should have the right class', () => {
      const wrapper = shallow(<LoadingIndicator/>);
      expect(wrapper.hasClass('sk-fading-circle')).to.be.true;
    });

    it('should have 12 children', () => {
      const wrapper = shallow(<LoadingIndicator/>);
      expect(wrapper.children()).to.have.length(12);
    });
  });
});
