import React from 'react';
import {shallow} from 'enzyme';
import {Layout} from '../../../../../client-src/common/components/layout';
import Alerts from '../../../../../client-src/common/components/alerts';
import Header from '../../../../../client-src/common/components/header';
import Footer from '../../../../../client-src/common/components/footer';

describe('Layout', function() {
  describe('mounting', () => {
    beforeEach(() => {
      stub(window, 'addEventListener');
      this.userOffline = stub();
      this.userOnline = stub();
      this.connectionActions = {
        userOffline: this.userOffline,
        userOnline: this.userOnline
      };
    });

    it('should register event listeners', () => {
      const props = {
        connectionActions: this.connectionActions
      };
      const wrapper = shallow(<Layout {...props}/>);
      wrapper.instance().componentDidMount();
      expect(window.addEventListener).to.have.been.calledTwice;
      expect(window.addEventListener).to.have.been.calledWith(
        'offline', wrapper.instance().onOffline
      );
      expect(window.addEventListener).to.have.been.calledWith(
        'online', wrapper.instance().onOnline
      );
    });

    it('should call `userOffline` when offline', () => {
      const props = {
        connectionActions: this.connectionActions
      };
      const wrapper = shallow(<Layout {...props}/>);
      wrapper.instance().onOffline();
      expect(this.userOffline).to.have.been.calledOnce;
    });

    it('should call `userOnline` when online', () => {
      const props = {
        connectionActions: this.connectionActions
      };
      const wrapper = shallow(<Layout {...props}/>);
      wrapper.instance().onOnline();
      expect(this.userOnline).to.have.been.calledOnce;
    });
  });

  describe('rendering', () => {
    it('should render Alerts', () => {
      const wrapper = shallow(<Layout/>);
      expect(wrapper.find(Alerts)).to.have.length(1);
    });

    it('should render a header with the right props', () => {
      const user = {};
      const props = {user};
      const wrapper = shallow(<Layout {...props}/>);
      expect(wrapper.find(Header)).to.have.length(1);
      expect(wrapper.find(Header).prop('user')).to.equal(user);
    });

    it('should render a footer', () => {
      const wrapper = shallow(<Layout/>);
      expect(wrapper.find(Footer)).to.have.length(1);
    });

    it('should render the children', () => {
      const children = <div className="hello"/>;
      const wrapper = shallow(
        <Layout>
          {children}
        </Layout>
      );
      expect(wrapper.find('.hello')).to.have.length(1);
    });
  });
});
