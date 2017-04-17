import React from 'react';
import {shallow} from 'enzyme';
import ErrorRetrieving from '../../../../../client/common/components/error-retrieving';

describe('ErrorRetrieving', function() {
  describe('rendering', () => {
    beforeEach(() => {
      this.retry = stub();
      this.defaultProps = {
        resourceName: 'sandwiches',
        retry: this.retry
      };
      this.wrapper = shallow(<ErrorRetrieving {...this.defaultProps}/>);
    });

    it('should have the right class', () => {
      expect(this.wrapper.hasClass('emptyResourceList')).to.be.true;
    });

    describe('the message', () => {
      it('should have the right text', () => {
        const message = this.wrapper.find('.emptyResourceList-message');
        const text = 'Oops – there was an error while fetching sandwiches.';
        expect(message.text()).to.equal(text);
      });
    });

    describe('the explanation', () => {
      it('should have the right text', () => {
        const message = this.wrapper.find('.emptyResourceList-explanation');
        const text = 'Click here to try again.';
        expect(message.text()).to.equal(text);
      });

      it('should call `retry` when the button is clicked', () => {
        const message = this.wrapper.find('.emptyResourceList-explanation');
        const button = message.find('button');
        button.simulate('click');
        expect(this.retry).to.have.been.calledOnce;
      });
    });
  });
});
