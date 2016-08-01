import React from 'react';
import {shallow} from 'enzyme';
import {Alerts} from '../../../../../client-src/common/components/alerts';
import Alert from '../../../../../client-src/common/components/alert';
import ReactCSSTransitionGroup from '../../../../../client-src/vendor/css-transition-group';

describe('Alerts', function() {
  beforeEach(() => {
    this.dispatch = stub();
    this.alertActions = {
      pizza: true
    };

    this.defaultProps = {
      animatingAlertOut: false,
      alerts: [],
      dispatch: this.dispatch,
      alertActions: this.alertActions
    };
  });

  describe('rendering with no alerts', () => {
    it('should render a CSSTransitionGroup', () => {
      const wrapper = shallow(<Alerts {...this.defaultProps}/>);
      expect(wrapper.type()).to.equal(ReactCSSTransitionGroup);
    });

    it('should pass the right props to the CSSTransitionGroup', () => {
      const wrapper = shallow(<Alerts {...this.defaultProps}/>);
      expect(wrapper.prop('className')).to.equal('alerts');
      expect(wrapper.prop('component')).to.equal('div');
      expect(wrapper.prop('transitionName')).to.equal('alert');
      expect(wrapper.prop('transitionAppear')).to.equal(true);
      expect(wrapper.prop('transitionEnterTimeout')).to.equal(250);
      expect(wrapper.prop('transitionLeaveTimeout')).to.equal(250);
      expect(wrapper.prop('transitionAppearTimeout')).to.equal(250);
    });

    it('should not render an Alert', () => {
      const wrapper = shallow(<Alerts {...this.defaultProps}/>);
      expect(wrapper.find(Alert)).to.have.length(0);
    });
  });

  describe('rendering with 1 alert', () => {
    it('should render a CSSTransitionGroup', () => {
      const props = {
        ...this.defaultProps,
        alerts: [{id: 1, persistent: false}]
      };

      const wrapper = shallow(<Alerts {...props}/>);
      expect(wrapper.type()).to.equal(ReactCSSTransitionGroup);
    });

    it('should pass the right props to the CSSTransitionGroup', () => {
      const wrapper = shallow(<Alerts {...this.defaultProps}/>);

      wrapper.setProps({
        alerts: [{id: 1, persistent: false}]
      });

      expect(wrapper.prop('className')).to.equal('alerts alertVisible');
      expect(wrapper.prop('component')).to.equal('div');
      expect(wrapper.prop('transitionName')).to.equal('alert');
      expect(wrapper.prop('transitionAppear')).to.equal(true);
      expect(wrapper.prop('transitionEnterTimeout')).to.equal(250);
      expect(wrapper.prop('transitionLeaveTimeout')).to.equal(250);
      expect(wrapper.prop('transitionAppearTimeout')).to.equal(250);
    });

    it('should render an Alert with the right props', () => {
      const wrapper = shallow(<Alerts {...this.defaultProps}/>);

      wrapper.setProps({
        alerts: [{id: 1, persistent: false}]
      });

      const alert = wrapper.find(Alert);
      expect(alert).to.have.length(1);
      expect(alert.prop('dispatch')).to.equal(this.dispatch);
      expect(alert.prop('animateOutAlert')).to.equal(wrapper.instance().animateOutAlert);
      expect(alert.prop('onTransitionOutAlert')).to.equal(wrapper.instance().onTransitionOutAlert);
      expect(alert.prop('animatingAlertOut')).to.be.false;
      expect(alert.prop('pizza')).to.be.true;
      expect(alert.prop('id')).to.equal(1);
      expect(alert.prop('persistent')).to.be.false;
    });
  });

  describe('rendering with 2 alerts', () => {
    it('should render a CSSTransitionGroup', () => {
      const props = {
        ...this.defaultProps,
        alerts: [
          {id: 1, persistent: false},
          {id: 2, persistent: false}
        ]
      };

      const wrapper = shallow(<Alerts {...props}/>);
      expect(wrapper.type()).to.equal(ReactCSSTransitionGroup);
    });

    it('should pass the right props to the CSSTransitionGroup', () => {
      const wrapper = shallow(<Alerts {...this.defaultProps}/>);

      wrapper.setProps({
        alerts: [
          {id: 1, persistent: false},
          {id: 2, persistent: false}
        ]
      });

      expect(wrapper.prop('className')).to.equal('alerts alertVisible');
      expect(wrapper.prop('component')).to.equal('div');
      expect(wrapper.prop('transitionName')).to.equal('alert');
      expect(wrapper.prop('transitionAppear')).to.equal(true);
      expect(wrapper.prop('transitionEnterTimeout')).to.equal(250);
      expect(wrapper.prop('transitionLeaveTimeout')).to.equal(250);
      expect(wrapper.prop('transitionAppearTimeout')).to.equal(250);
    });

    it('should render an Alert with the right props', () => {
      const wrapper = shallow(<Alerts {...this.defaultProps}/>);

      wrapper.setProps({
        alerts: [
          {id: 1, persistent: false},
          {id: 2, persistent: false}
        ]
      });

      const alert = wrapper.find(Alert);
      expect(alert).to.have.length(1);
      expect(alert.prop('dispatch')).to.equal(this.dispatch);
      expect(alert.prop('animateOutAlert')).to.equal(wrapper.instance().animateOutAlert);
      expect(alert.prop('onTransitionOutAlert')).to.equal(wrapper.instance().onTransitionOutAlert);
      expect(alert.prop('animatingAlertOut')).to.be.false;
      expect(alert.prop('pizza')).to.be.true;
      expect(alert.prop('id')).to.equal(1);
      expect(alert.prop('persistent')).to.be.false;
    });
  });

  describe('when animateOutAlert is called', () => {
    it('should remove the Alert', () => {
      const wrapper = shallow(<Alerts {...this.defaultProps}/>);

      wrapper.setProps({
        alerts: [
          {id: 1, persistent: false},
        ]
      });

      let alert = wrapper.find(Alert);
      alert.prop('animateOutAlert')();
      wrapper.update();
      alert = wrapper.find(Alert);
      expect(alert).to.have.length(0);
    });
  });

  describe('when onTransitionOutAlert is called', () => {
    describe('and has a queued alert', () => {
      it('should retain the classNames', () => {
        const wrapper = shallow(<Alerts {...this.defaultProps}/>);

        wrapper.setProps({
          alerts: [
            {id: 1, persistent: false},
          ]
        });

        expect(wrapper.prop('className')).to.equal('alerts alertVisible');

        const alert = wrapper.find(Alert);
        alert.prop('onTransitionOutAlert')();
        wrapper.update();
        expect(wrapper.prop('className')).to.equal('alerts alertVisible');
      });
    });

    describe('and has no queued alerts', () => {
      it('should have the correct className', () => {
        const wrapper = shallow(<Alerts {...this.defaultProps}/>);

        wrapper.setProps({
          alerts: [
            {id: 1, persistent: false},
          ]
        });

        expect(wrapper.prop('className')).to.equal('alerts alertVisible');

        const alert = wrapper.find(Alert);
        wrapper.setProps({
          alerts: []
        });
        alert.prop('onTransitionOutAlert')();
        wrapper.update();
        expect(wrapper.prop('className')).to.equal('alerts');
      });
    });
  });


  // test for conditions to bail out
  // case when no alerts are queued (alert to no alert)
  // case when alert is queued (one alert to different alert)
  // (check for Alert prop id

  describe('when componentWillReceiveProps is called', () => {
    it('should not change activeAlert when animatingAlertOut is true', () => {
      const wrapper = shallow(<Alerts {...this.defaultProps}/>);
      let alert = wrapper.find(Alert);

      expect(wrapper.prop('className')).to.equal('alerts');
      expect(alert).to.have.length(0);

      wrapper.setProps({
        alerts: [
          {id: 1, persistent: false},
        ],
        animatingAlertOut: true
      });

      expect(wrapper.prop('className')).to.equal('alerts');
      alert = wrapper.find(Alert);
      expect(alert).to.have.length(0);
    });

    it('should change activeAlert when animatingAlertOut is false', () => {
      const wrapper = shallow(<Alerts {...this.defaultProps}/>);
      let alert = wrapper.find(Alert);

      expect(wrapper.prop('className')).to.equal('alerts');
      expect(alert).to.have.length(0);

      wrapper.setProps({
        alerts: [
          {id: 1, persistent: false},
        ]
      });

      expect(wrapper.prop('className')).to.equal('alerts alertVisible');

      alert = wrapper.find(Alert);
      expect(alert).to.have.length(1);
      expect(alert.prop('id')).to.equal(1);
    });

    it('should not change activeAlert when there are no alerts queued', () => {
      const wrapper = shallow(<Alerts {...this.defaultProps}/>);
      let alert = wrapper.find(Alert);

      expect(wrapper.prop('className')).to.equal('alerts');
      expect(alert).to.have.length(0);

      wrapper.setProps({
        alerts: [],
      });

      expect(wrapper.prop('className')).to.equal('alerts');

      alert = wrapper.find(Alert);
      expect(alert).to.have.length(0);
    });

    it('should change activeAlert when a different alert is queued', () => {
      const wrapper = shallow(<Alerts {...this.defaultProps}/>);

      wrapper.setProps({
        alerts: [
          {id: 1, persistent: false},
          {id: 2, persistent: false}
        ]
      });

      expect(wrapper.prop('className')).to.equal('alerts alertVisible');
      let alert = wrapper.find(Alert);
      expect(alert).to.have.length(1);
      expect(alert.prop('id')).to.equal(1);

      wrapper.instance().animateOutAlert();

      wrapper.setProps({
        alerts: [
          {id: 2, persistent: false}
        ]
      });

      expect(wrapper.prop('className')).to.equal('alerts alertVisible');

      alert = wrapper.find(Alert);
      expect(alert).to.have.length(1);
      expect(alert.prop('id')).to.equal(2);
    });
  });
});
