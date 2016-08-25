import _ from 'lodash';
import React from 'react';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as contactActionCreators from '../../../redux/contact/action-creators';

const Contact = React.createClass({
  componentWillUnmount() {
    const {contactActions} = this.props;
    // This ensures that if the user leaves the page, then comes back, that
    // they can always send another message. Without it, the success message
    // would stick around forever.
    contactActions.resetSendMessageResolution();
    if (this.sendMessageXhr) {
      this.sendMessageXhr.abort();
    }
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
    );
  },

  sendMessage(data) {
    const {contactActions} = this.props;
    this.sendMessageXhr = contactActions.sendMessage(data);
  },

  getContactForm() {
    const {
      fields: {subject, body},
      handleSubmit,
      sendingMessageStatus
    } = this.props;

    const messageInFlight = sendingMessageStatus === 'PENDING';
    const sendBtnText = messageInFlight ? 'Sending...' : 'Send';
    const sendBtnDisabled = messageInFlight;

    const placeholder = body.touched && body.error === 'empty' ? 'Please enter a message!' : '';

    return (
      <div>
        <p className="paragraph">
          Send us feedback, bug reports, feature requests; we’re always looking for ways to improve Moolah.
        </p>
        <form onSubmit={handleSubmit(this.sendMessage)}>
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
          <div className="form-row contactPage-submitRow">
            <button
              className="btn btn-info contactPage-submitBtn"
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
    const {sendingMessageStatus} = this.props;

    const messageSent = sendingMessageStatus === 'SUCCESS';
    const contactContent = messageSent ? this.getSuccessMessage() : this.getContactForm();

    return (
      <div className="container contactPage">
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
    sendingMessageStatus: state.contact.sendingMessageStatus
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
