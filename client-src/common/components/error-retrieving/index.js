import React from 'react';

export default function ErrorRetrieving({resourceName, retry}) {
  return (
    <div className="emptyResourceList">
      <div className="emptyResourceList-message">
        Oops – there was an error while fetching {resourceName}.
      </div>
      <div className="emptyResourceList-explanation">
        <button onClick={retry}>Click here to try again</button>.
      </div>
    </div>
  );
}
