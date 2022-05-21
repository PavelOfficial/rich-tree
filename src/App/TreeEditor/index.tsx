import React from 'react';

import './index.css'

export const TreeEditor = () => {
  return (
    <div className="TreeEditor">
      <div className="TreeEditor__viewport">
        <div />
        <div />
      </div>
      <div className="TreeEditor__controls">
        <button type="button">Refresh</button>
        <button type="button">Rempove</button>
      </div>
    </div>
  );
};
