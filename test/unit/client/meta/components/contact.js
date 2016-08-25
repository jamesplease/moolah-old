import React from 'react';
import {shallow} from 'enzyme';
import {
  Contact, __GetDependency__
} from '../../../../../client-src/meta/components/contact';

const validate = __GetDependency__('validate');

describe('Contact', function() {
  describe('validate', () => {
    it('should return an empty obj when there is a value', () => {
      const values = {
        body: 'sandwich'
      };
      expect(validate(values)).to.deep.equal({});
    });

    it('should return an error of "empty" when there is only whitespace', () => {
      const values = {
        body: '   '
      };
      expect(validate(values)).to.deep.equal({
        body: 'empty'
      });
    });

    it('should return an error of "empty" when there is no value', () => {
      const values = {
        body: ''
      };
      expect(validate(values)).to.deep.equal({
        body: 'empty'
      });
    });
  });

  describe('rendering with no `onClick` prop', () => {
    beforeEach(() => {
      this.handleSubmit = stub().returns('oink');
      this.fields = {
        subject: {
          touched: false,
          error: false
        },
        body: {
          touched: false,
          error: false
        }
      };

      this.mockSendMessageXhr = {
        abort: stub()
      };

      this.contactActions = {
        sendMessage: stub().returns(this.mockSendMessageXhr),
        resetSendMessageResolution: stub()
      };

      this.defaultProps = {
        fields: this.fields,
        sendingMessageStatus: null,
        handleSubmit: this.handleSubmit,
        contactActions: this.contactActions
      };
    });

    describe('unmounting', () => {
      it('should call `resetSendMessageResolution`', () => {
        const wrapper = shallow(<Contact {...this.defaultProps}/>);
        wrapper.instance().componentWillUnmount();
        expect(this.contactActions.resetSendMessageResolution).to.have.been.calledOnce;
      });

      it('should call `abort` on the xhr', () => {
        const wrapper = shallow(<Contact {...this.defaultProps}/>);
        wrapper.instance().sendMessage('hello');
        wrapper.instance().componentWillUnmount();
        expect(this.mockSendMessageXhr.abort).to.have.been.calledOnce;
      });
    });

    describe('rendering when `sendingMessageStatus` is "SUCCESS"', () => {
      it('should not have a form', () => {
        const props = {
          ...this.defaultProps,
          sendingMessageStatus: 'SUCCESS'
        };
        const wrapper = shallow(<Contact {...props}/>);
        expect(wrapper.find('form')).to.have.length(0);
      });

      it('should have two paragraphs', () => {
        const props = {
          ...this.defaultProps,
          sendingMessageStatus: 'SUCCESS'
        };
        const wrapper = shallow(<Contact {...props}/>);
        const paragraphs = wrapper.find('.paragraph');
        expect(paragraphs).to.have.length(2);
        expect(paragraphs.at(0).text()).to.equal('Thanks for the feedback!');
      });
    });

    describe('rendering when `sendingMessageStatus` is null', () => {
      it('should have the right class', () => {
        const wrapper = shallow(<Contact {...this.defaultProps}/>);
        expect(wrapper.hasClass('contactPage')).to.be.true;
      });

      it('should have the right header text', () => {
        const wrapper = shallow(<Contact {...this.defaultProps}/>);
        expect(wrapper.find('h1').text()).to.equal('Contact Us');
      });

      it('should have a form', () => {
        const wrapper = shallow(<Contact {...this.defaultProps}/>);
        expect(wrapper.find('form')).to.have.length(1);
      });

      it('should have an input for the subject with a placeholder', () => {
        const wrapper = shallow(<Contact {...this.defaultProps}/>);
        const subjectInput = wrapper.find('.text-input');
        expect(subjectInput).to.have.length(1);
        expect(subjectInput.prop('placeholder')).to.equal('Subject (optional)');
      });

      it('should have a textarea with no placeholder', () => {
        const wrapper = shallow(<Contact {...this.defaultProps}/>);
        const textarea = wrapper.find('.textarea-input');
        expect(textarea).to.have.length(1);
        expect(textarea.prop('placeholder')).to.equal('');
      });

      it('should have a btn with the right text', () => {
        const wrapper = shallow(<Contact {...this.defaultProps}/>);
        const submitBtn = wrapper.find('.contactPage-submitBtn');
        expect(submitBtn.text()).to.equal('Send');
      });

      it('should call `handleSubmit` with the right props when the form is submitted', () => {
        const wrapper = shallow(<Contact {...this.defaultProps}/>);
        expect(this.handleSubmit).to.have.been.calledOnce;
        const sendForm = wrapper.find('form');
        expect(sendForm.prop('onSubmit')).to.equal('oink');
      });
    });

    describe('rendering when `sendingMessageStatus` is "PENDING"', () => {
      it('should have a textarea with no placeholder', () => {
        const props = {
          ...this.defaultProps,
          sendingMessageStatus: 'PENDING'
        };
        const wrapper = shallow(<Contact {...props}/>);
        const submitBtn = wrapper.find('.contactPage-submitBtn');
        expect(submitBtn.text()).to.equal('Sending...');
      });
    });

    describe('rendering when the textarea has been modified but not errored', () => {
      it('should have a textarea with no placeholder', () => {
        const props = {
          ...this.defaultProps,
          fields: {
            subject: {
              touched: false,
              error: false
            },
            body: {
              touched: true,
              error: false
            }
          }
        };
        const wrapper = shallow(<Contact {...props}/>);
        const textarea = wrapper.find('.textarea-input');
        expect(textarea).to.have.length(1);
        expect(textarea.prop('placeholder')).to.equal('');
      });
    });

    describe('rendering when the textarea has been modified and has an error', () => {
      it('should have a textarea with a placeholder', () => {
        const props = {
          ...this.defaultProps,
          fields: {
            subject: {
              touched: false,
              error: false
            },
            body: {
              touched: true,
              error: 'empty'
            }
          }
        };
        const wrapper = shallow(<Contact {...props}/>);
        const textarea = wrapper.find('.textarea-input');
        expect(textarea).to.have.length(1);
        expect(textarea.prop('placeholder')).to.equal('Please enter a message!');
      });
    });
  });
});
