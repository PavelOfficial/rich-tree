import React from 'react';

import { VirtualScrollTree } from './VirtualScrollTree';
import { Info } from './Info';
import { Controls } from './Controls';

import './index.css';

export const TreeEditor = () => {
  return (
    <div className="TreeEditor">
      <div className="TreeEditor__viewport">
        <VirtualScrollTree />
        <Info />
      </div>
      <Controls />
    </div>
  );
};
