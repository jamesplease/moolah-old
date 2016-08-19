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
      text: 'pasta is good',
      animatingAlertOut: false,
      isDismissable: true,
      persistent: true,
      animateOutAlert: this.animateOutAlert,
      destroyFirstAlert: this.destroyFirstAlert
    };
  });

  describe('rendering', () => {
    it('should render with the correct className with idDismissable as true', () => {
      const wrapper = shallow(<Alert {...this.defaultProps}/>);
      expect(wrapper.hasClass('alert alert-success dismissable-alert')).to.be.true;
    });

    it('should render with the correct className with isDismissable as false', () => {
      const props = {
        ...this.defaultProps,
        isDismissable: false
      };

      const wrapper = shallow(<Alert {...props}/>);
      expect(wrapper.hasClass('alert alert-success')).to.be.true;
    });

    it('should have the correct html text', () => {
      const wrapper = shallow(<Alert {...this.defaultProps}/>);
      const alertTitle = wrapper.find('.alert-title');
      expect(alertTitle.text()).to.equal('pasta is good');
    });

    it('should not have a details list', () => {
      const wrapper = shallow(<Alert {...this.defaultProps}/>);
      expect(wrapper.find('.alert-details-list')).to.have.length(0);
    });

    describe('with details', () => {
      it('should render a details list', () => {
        const props = {
          ...this.defaultProps,
          details: [
            'hello'
          ]
        };

        const wrapper = shallow(<Alert {...props}/>);
        expect(wrapper.find('.alert-details-list')).to.have.length(1);
      });

      it('should render the passed-in details', () => {
        const props = {
          ...this.defaultProps,
          details: [
            'hello',
            'friend'
          ]
        };

        const wrapper = shallow(<Alert {...props}/>);
        const detailsList = wrapper.find('.alert-details-list');
        expect(detailsList.children()).to.have.length(2);
        expect(detailsList.childAt(0).text()).to.equal('hello');
        expect(detailsList.childAt(1).text()).to.equal('friend');
      });
    });

    describe('the dismissBtn', () => {
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

      it('should call animateOutAlert when clicked, but not 4 seconds later', () => {
        const props = {
          ...this.defaultProps,
          persistent: false
        };

        const wrapper = shallow(<Alert {...props}/>);
        wrapper.instance().componentDidTransition('enter');
        expect(this.animateOutAlert).to.not.have.been.called;
        this.clock.tick(1000);
        const dismiss = wrapper.find('.alert-dismiss');
        dismiss.simulate('click');
        expect(this.animateOutAlert).to.have.been.calledOnce;
        this.clock.tick(4000);
        expect(this.animateOutAlert).to.have.been.calledOnce;
      });
    });
  });

  describe('componentDidTransition', () => {
    describe('and transitionType is "enter"', () => {
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

    describe('and transitionType is "leave"', () => {
      it('should call destroyFirstAlert', () => {
        const wrapper = shallow(<Alert {...this.defaultProps}/>);
        wrapper.instance().componentDidTransition('leave');
        expect(this.destroyFirstAlert).to.have.been.calledOnce;
      });
    });
  });
});
