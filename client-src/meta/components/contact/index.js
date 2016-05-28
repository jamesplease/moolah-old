import React from 'react';

export default function Contact() {
  return (
    <div className="container text-container contact-page">
      <h1>
        Contact Us
      </h1>
      <p className="paragraph">
        Send us feedback, bug reports, feature requests; we’re always looking for ways to improve Moolah.
      </p>
      <form>
        <div className="form-row">
          <input type="text" className="text-input" placeholder="Subject (optional)"/>
        </div>
        <div className="form-row">
          <textarea
            className="textarea-input"
            placeholder="Type your message here…"
            autoComplete="on"
            maxLength={10000}
            rows={6}
            spellCheck={true}/>
        </div>
        <div className="form-row contact-submit-row">
          <button className="btn btn-info contact-submit-btn">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
