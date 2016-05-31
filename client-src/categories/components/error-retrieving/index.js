import React from 'react';

export default function EmptyCategories(props) {
  return (
    <div className="empty-resource-list">
      <div className="empty-resource-list-message">
        Oops – there was an error while fetching Categories.
      </div>
      <div className="empty-resource-list-explanation">
        <button onClick={props.retry}>Click here to try again</button>.
      </div>
    </div>
  );
}
