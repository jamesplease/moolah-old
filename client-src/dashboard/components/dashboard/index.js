import React from 'react';
import Subheader from '../subheader';

export default function Dashboard() {
  return (
    <div>
      <Subheader/>
      <div className="dashboard-content container padded-container container-bottomSpaced">
        Dashboard is here
      </div>
    </div>
  );
}
