import React from 'react';
import {shallow} from 'enzyme';
import Alert from '../../../../../client-src/common/components/alert';

describe('Alert', function() {
  beforeEach(() => {
    this.animateOutAlert = stub();
    this.dispatch = stub();
    this.destroyFirstAlert = stub();
    this.onTransitionOutAlert = stub();
    this.clock = useFakeTimers();

    this.defaultProps = {
      style: 'success',
      text: 'hello<br/>world',
      animatingAlertOut: false,
      isDismissable: true,
      persistent: true,
      animateOutAlert: this.animateOutAlert,
      dispatch: this.dispatch,
      destroyFirstAlert: this.destroyFirstAlert,
      onTransitionOutAlert: this.onTransitionOutAlert
    };
  });

  describe('rendering', () => {
    it('should render with the correct className with idDismissable as true', () => {
      const wrapper = shallow(<Alert {...this.defaultProps}/>);
      expect(wrapper.hasClass('alert success dismissable-alert')).to.be.true;
    });

    it('should render with the correct className with isDismissable as false', () => {
      const props = {
        ...this.defaultProps,
        isDismissable: false
      };

      const wrapper = shallow(<Alert {...props}/>);
      expect(wrapper.hasClass('alert success')).to.be.true;
    });

    it('should have the correct html text', () => {
      const wrapper = shallow(<Alert {...this.defaultProps}/>);
      const alertText = wrapper.find('.alert-text');

      // `find` returns itself if it matches the selector, in this case it returns two nodes.
      // We're using a more specific selector to prevent this from happening.
      const alertTextHtml = alertText.find('> span');
      const textHtml = {
        __html: 'hello<br/>world'
      };

      expect(alertTextHtml.prop('dangerouslySetInnerHTML')).to.deep.equal(textHtml);
    });

    describe('the dismissIcon', () => {
      it('should exist when isDismissable is true', () => {
        const wrapper = shallow(<Alert {...this.defaultProps}/>);
        expect(wrapper.find('.alert-dismiss')).to.have.length(1);
      });

      it('should render the correct icon', () => {
        const wrapper = shallow(<Alert {...this.defaultProps}/>);
        const dismiss = wrapper.find('.alert-dismiss');
        expect(dismiss.find('.zmdi.zmdi-close')).to.have.length(1);
      });

      it('should not exist when isDismissable is false', () => {
        const props = {
          ...this.defaultProps,
          isDismissable: false
        };

        const wrapper = shallow(<Alert {...props}/>);
        expect(wrapper.find('.alert-dismiss')).to.have.length(0);
      });

      it('should not be disabled when animatingAlertOut is false', () => {
        const wrapper = shallow(<Alert {...this.defaultProps}/>);
        const dismiss = wrapper.find('.alert-dismiss');
        expect(dismiss.prop('disabled')).to.be.false;
      });

      it('should be disabled when animatingAlertOut is true', () => {
        const props = {
          ...this.defaultProps,
          animatingAlertOut: true
        };

        const wrapper = shallow(<Alert {...props}/>);
        const dismiss = wrapper.find('.alert-dismiss');
        expect(dismiss.prop('disabled')).to.be.true;
      });

      it('should call animatingAlertOut when clicked', () => {
        const wrapper = shallow(<Alert {...this.defaultProps}/>);
        const dismiss = wrapper.find('.alert-dismiss');
        dismiss.simulate('click');
        expect(this.animateOutAlert).to.be.calledOnce;
      });
    });

    describe('the alert icon', () => {
      it('should render the correct alert icon when not overriding icon', () => {
        const wrapper = shallow(<Alert {...this.defaultProps}/>);
        expect(wrapper.find('.zmdi.alert-icon.zmdi-check')).to.have.length(1);
      });

      it('should render the correct alert icon when overriding icon', () => {
        const props = {
          ...this.defaultProps,
          icon: 'pizza'
        };
        const wrapper = shallow(<Alert {...props}/>);
        expect(wrapper.find('.zmdi.alert-icon.pizza')).to.have.length(1);
      });
    });
  });

  describe('componentDidTransition', () => {
    describe('and transitionType is \'enter\'', () => {
      it('should not call animateOutAlert if persistent is true', () => {
        const wrapper = shallow(<Alert {...this.defaultProps}/>);
        wrapper.instance().componentDidTransition('enter');
        expect(this.animateOutAlert).to.not.have.been.called;
        this.clock.tick(4000);
        expect(this.animateOutAlert).to.not.have.been.called;
      });

      it('should call animateOutAlert if persistent is false', () => {
        const props = {
          ...this.defaultProps,
          persistent: false
        };

        const wrapper = shallow(<Alert {...props}/>);
        wrapper.instance().componentDidTransition('enter');
        expect(this.animateOutAlert).to.not.have.been.called;
        this.clock.tick(4000);
        expect(this.animateOutAlert).to.have.been.calledOnce;
      });
    });

    describe('and transitionType is \'leave\'', () => {
      it('should prevent animateOutAlert from being called', () => {
        const props = {
          ...this.defaultProps,
          persistent: false
        };

        const wrapper = shallow(<Alert {...props}/>);
        wrapper.instance().componentDidTransition('enter');
        expect(this.animateOutAlert).to.not.have.been.called;
        this.clock.tick(1000);
        wrapper.instance().componentDidTransition('leave');
        this.clock.tick(4000);
        expect(this.animateOutAlert).to.not.have.been.called;
      });

      it('should call dispatch if onDismissAction has a value', () => {
        const props = {
          ...this.defaultProps,
          onDismissAction: 'action'
        };
        const wrapper = shallow(<Alert {...props}/>);
        wrapper.instance().componentDidTransition('leave');
        expect(this.dispatch).to.have.been.calledOnce;
        expect(this.dispatch).to.have.been.calledWith('action');
      });

      it('should call destroyFirstAlert and onTransitionOutAlert', () => {
        const wrapper = shallow(<Alert {...this.defaultProps}/>);
        wrapper.instance().componentDidTransition('leave');
        expect(this.destroyFirstAlert).to.have.been.calledOnce;
        expect(this.destroyFirstAlert).to.have.been.calledBefore(this.onTransitionOutAlert);
        expect(this.onTransitionOutAlert).to.have.been.calledOnce;
      });
    });
  });
});


