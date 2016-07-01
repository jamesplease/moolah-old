import React from 'react';
import {GatewayDest} from 'react-gateway';

// The overlay is the containing element for both alerts and modals. It has the
// important role of making sure that the two play nicely together. No overlaps,
// etc.
export default function Overlay() {
  return (
    <div className="overlay">
      <GatewayDest name="alert-gateway" className="alert-gateway"/>
      <GatewayDest name="modal-gateway" className="modal-gateway"/>
    </div>
  );
}
