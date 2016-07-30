import React from 'react';
import {shallow} from 'enzyme';
import LoadingResourceList from '../../../../../client-src/common/components/loading-resource-list';
import LoadingIndicator from '../../../../../client-src/common/components/loading-indicator';

describe('LoadingResourceList', function() {
  describe('rendering', () => {
    it('should have the right class', () => {
      const wrapper = shallow(<LoadingResourceList/>);
      expect(wrapper.hasClass('loadingResourceList')).to.be.true;
    });

    it('should have a LoadingIndicator', () => {
      const wrapper = shallow(<LoadingResourceList/>);
      expect(wrapper.find(LoadingIndicator)).to.have.length(1);
    });
  });
});
