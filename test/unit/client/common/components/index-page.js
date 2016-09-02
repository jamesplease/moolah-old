import React from 'react';
import {shallow} from 'enzyme';
import {IndexPage, __get__} from '../../../../../client-src/common/components/index-page';
import Dashboard from '../../../../../client-src/dashboard/components/dashboard';
import LandingPage from '../../../../../client-src/meta/components/landing-page';

const mapStateToProps = __get__('mapStateToProps');

describe('IndexPage', function() {
  describe('mapStateToProps', () => {
    it('returns the right props', () => {
      expect(mapStateToProps({
        auth: {
          user: {
            name: 'oink'
          }
        },
        transactions: [],
        categories: {}
      })).to.deep.equal({
        user: {name: 'oink'}
      });
    });
  });

  describe('rendering with a user', () => {
    it('should render the Dashboard', () => {
      const props = {
        user: {}
      };
      const wrapper = shallow(<IndexPage {...props}/>);
      expect(wrapper.type()).to.equal(Dashboard);
    });
  });

  describe('rendering with no user', () => {
    it('should render the LandingPage', () => {
      const props = {
        user: null
      };
      const wrapper = shallow(<IndexPage {...props}/>);
      expect(wrapper.type()).to.equal(LandingPage);
    });
  });
});
