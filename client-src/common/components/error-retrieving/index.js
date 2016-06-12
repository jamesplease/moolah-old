import React from 'react';

export default function ErrorRetrieving({resourceName, retry}) {
  return (
    <div className="empty-resource-list">
      <div className="empty-resource-list-message">
        Oops – there was an error while fetching {resourceName}.
      </div>
      <div className="empty-resource-list-explanation">
        <button onClick={retry}>Click here to try again</button>.
      </div>
    </div>
  );
}
