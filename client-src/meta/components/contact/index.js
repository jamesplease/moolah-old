import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as contactActionCreators from '../../../redux/contact/action-creators';

const Contact = React.createClass({
  componentWillUnmount() {
    const {contactActions} = this.props;
    contactActions.resetMessageState();
  },

  getSuccessMessage() {
    return (
      <div>
        <p className="paragraph">
          Thanks for the feedback!
        </p>
        <p className="paragraph">
          Your message has been received. We do our best to respond within 72 hours.
        </p>
      </div>
    )
  },

  getContactForm() {
    const {
      fields: {subject, body},
      handleSubmit,
      contactActions,
      sendingMessage,
      sendMessageFailure
    } = this.props;

    function onSubmit(data) {
      contactActions.sendMessage(data);
    }

    const sendBtnText = sendingMessage ? 'Sending...' : 'Send';
    const sendBtnDisabled = sendingMessage;

    const placeholder = body.touched && body.error === 'empty' ? 'Please enter a message!' : '';

    const errorClass = classNames({
      'form-row form-error contact-page-error': true,
      visible: sendMessageFailure
    });

    return (
      <div>
        <p className="paragraph">
          Send us feedback, bug reports, feature requests; we’re always looking for ways to improve Moolah.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <input
              type="text"
              className="text-input"
              placeholder="Subject (optional)"
              {...subject}/>
          </div>
          <div className="form-row">
            <textarea
              className="textarea-input"
              placeholder={placeholder}
              autoComplete="on"
              maxLength={10000}
              rows={6}
              spellCheck={true}
              {...body}/>
          </div>
          <div className={errorClass}>
            The message failed to send. Please try again.
          </div>
          <div className="form-row contact-submit-row">
            <button
              className="btn btn-info contact-submit-btn"
              type="submit"
              disabled={sendBtnDisabled}>
              {sendBtnText}
            </button>
          </div>
        </form>
      </div>
    );
  },

  render() {
    const {sendMessageSuccess} = this.props;

    const contactContent = sendMessageSuccess ? this.getSuccessMessage() : this.getContactForm();

    return (
      <div className="container contact-page">
        <div className="text-container">
          <h1>
            Contact Us
          </h1>
          {contactContent}
        </div>
      </div>
    );
  }
});

export {Contact};

function validate(values) {
  const body = _.result(values.body, 'trim');

  const errors = {};

  // Prevent empty labels
  if (!body) {
    errors.body = 'empty';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    sendingMessage: state.contact.sendingMessage,
    sendMessageSuccess: state.contact.sendMessageSuccess,
    sendMessageFailure: state.contact.sendMessageFailure,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    contactActions: bindActionCreators(contactActionCreators, dispatch)
  };
}

export default reduxForm(
  {
    form: 'sendMessage',
    fields: ['subject', 'body'],
    validate
  },
  mapStateToProps,
  mapDispatchToProps
)(Contact);
