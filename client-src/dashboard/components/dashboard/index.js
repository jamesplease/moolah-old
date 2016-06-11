import React from 'react';
import Subheader from '../subheader';

export default function Dashboard() {
  return (
    <div>
      <Subheader/>
      <div className="dashboard-content container padded-container">
        Dashboard is here
      </div>
    </div>
  );
}
