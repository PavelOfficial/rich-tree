import React from 'react';

import './index.css';

import { VirtualScrollTree } from './VirtualScrollTree';
import { Info } from './Info';

export const TreeEditor = () => {
  return (
    <div className="TreeEditor">
      <div className="TreeEditor__viewport">
        <VirtualScrollTree />
        <Info />
      </div>
      <div className="TreeEditor__controls">
        <button type="button">Refresh</button>
        <button type="button">Remove</button>
      </div>
    </div>
  );
};
