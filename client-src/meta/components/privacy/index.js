import React from 'react';

export default function Privacy() {
  return (
    <div className="container container-bottomSpaced">
      <div className="text-container">
        <h1>
          Privacy Policy
        </h1>
        <p className="paragraph">
          Moolah is an alpha release application right now. That means it's not
          ready to be used, aside from if you're interested in testing it out.
        </p>
        <h2>
          Information We Collect
        </h2>
        <p className="paragraph">
          Moolah uses common technologies for all visitors, such as cookies,
          to track the same basic information that all websites collect. This
          occurs whether or not you have an account with us or not.
        </p>
        <p className="paragraph">
          If you choose to make an account, we collect the minimum amount of
          information necessary for you to use our service. You provide this
          information at account creation time, and it typically includes a
          name and an email address.
        </p>
        <p className="paragraph">
          Presently, all information collected by Moolah is destroyed each time
          the application is deployed. Releases typically occur numerous times
          per week.
        </p>
        <h2>
          How We Share the Information We Collect
        </h2>
        <p className="paragraph">
          We do not share or sell any information we collect.
        </p>
      </div>
    </div>
  );
}
