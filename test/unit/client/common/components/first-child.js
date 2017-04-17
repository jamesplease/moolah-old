import React from 'react';
import {shallow} from 'enzyme';
import FirstChild from '../../../../../client/common/components/first-child';

describe('FirstChild', function() {
  describe('rendering with no children', () => {
    it('should be empty', () => {
      const wrapper = shallow(<FirstChild/>);
      // `wrapper.isEmpty()` returned false for some reason
      expect(wrapper.children()).to.have.length(0);
    });
  });

  describe('rendering with 1 child', () => {
    it('should render the child', () => {
      const wrapper = shallow(
        <FirstChild>
          <div className="oink"/>
        </FirstChild>
      );
      expect(wrapper.hasClass('oink')).to.be.true;
    });
  });

  describe('rendering with 3 children', () => {
    it('should render just the first', () => {
      const wrapper = shallow(
        <FirstChild>
          <div className="what"/>
          <div className="sandwiches"/>
          <div className="pasta"/>
        </FirstChild>
      );
      expect(wrapper.hasClass('what')).to.be.true;
    });
  });
});
