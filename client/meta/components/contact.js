import React, {Component} from 'react';

export default class Contact extends Component {
  render() {
    return (
      <div className="container container-bottomSpaced contactPage">
        <div className="text-container">
          <h1>
            Contact Us
          </h1>
          <div>
            <p className="paragraph">
              Send us feedback, bug reports, feature requests; we’re always looking for ways to improve Moolah.
            </p>
            <p className="paragraph">
              The best way to reach us is on Twitter: just message
              {" "}
              <a href="https://twitter.com/jmeaspls">
                @jmeaspls
              </a>.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
