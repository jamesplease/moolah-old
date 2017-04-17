import React from 'react';
import {shallow} from 'enzyme';
import {
  Layout, __Rewire__, __ResetDependency__, __get__
} from '../../../../../client/common/components/layout';
import Alerts from '../../../../../client/common/components/alerts';
import Header from '../../../../../client/common/components/header';
import Footer from '../../../../../client/common/components/footer';

const mapStateToProps = __get__('mapStateToProps');
const mapDispatchToProps = __get__('mapDispatchToProps');

describe('Layout', function() {
  describe('mapStateToProps', () => {
    it('returns the right props', () => {
      expect(mapStateToProps({
        auth: {
          user: {
            name: 'oink'
          }
        },
        transactions: [1, 2, 3],
        oink: true
      })).to.deep.equal({
        user: {name: 'oink'}
      });
    });
  });

  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      this.userOffline = stub().returns({pasta: true});
      this.userOnline = stub().returns(false);
      __Rewire__('connectionActionCreators', {
        userOffline: this.userOffline,
        userOnline: this.userOnline,
      });

      this.dispatch = stub();
      this.props = mapDispatchToProps(this.dispatch);
    });

    afterEach(() => {
      __ResetDependency__('connectionActionCreators');
    });

    it('returns the right props', () => {
      expect(this.props).to.have.keys(['userOffline', 'userOnline']);
    });

    it('returns a functioning `userOffline`', () => {
      this.props.userOffline();
      expect(this.userOffline).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledWithExactly({pasta: true});
    });

    it('returns a functioning `userOnline`', () => {
      this.props.userOnline();
      expect(this.userOnline).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledWithExactly(false);
    });
  });

  describe('mounting', () => {
    beforeEach(() => {
      stub(window, 'addEventListener');
      this.userOffline = stub();
      this.userOnline = stub();
    });

    it('should register event listeners', () => {
      const props = {
        userOffline: this.userOffline,
        userOnline: this.userOnline,
      };
      const wrapper = shallow(<Layout {...props}/>);
      wrapper.instance().componentDidMount();
      expect(window.addEventListener).to.have.been.calledTwice;
      expect(window.addEventListener).to.have.been.calledWith(
        'offline', this.userOffline
      );
      expect(window.addEventListener).to.have.been.calledWith(
        'online', this.userOnline
      );
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
